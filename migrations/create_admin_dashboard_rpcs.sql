-- Migration: create_admin_dashboard_rpcs
-- Defines the two RPC functions the backend calls but that were never in version control:
--   * rpc_get_admin_dashboard(...)      -> analytics.service.ts  getAdminDashboard()
--   * rpc_get_projects_with_regions()   -> regions.service.ts    getProjectsWithRegions()
-- Idempotent: safe to run more than once.
--
-- Return shapes match src/lib/types/analytics.types.ts (DashboardOverview) and
-- src/lib/types/regions.types.ts (ProjectWithRegions[]).
--
-- All parameters have defaults so the backend's fallback calls (fewer named
-- arguments) resolve to this same function.

-- Drop any earlier signature so re-running never leaves an ambiguous overload.
DROP FUNCTION IF EXISTS public.rpc_get_admin_dashboard(uuid, uuid, text, integer, integer, integer, date, date);
DROP FUNCTION IF EXISTS public.rpc_get_projects_with_regions();

CREATE OR REPLACE FUNCTION public.rpc_get_admin_dashboard(
  project_uuid      uuid    DEFAULT NULL,
  region_uuid       uuid    DEFAULT NULL,
  interval_type     text    DEFAULT 'year',
  filter_year       integer DEFAULT NULL,
  filter_quarter    integer DEFAULT NULL,
  filter_month      integer DEFAULT NULL,
  filter_start_date date    DEFAULT NULL,
  filter_end_date   date    DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SET search_path = public
AS $$
DECLARE
  v_from   timestamptz;   -- inclusive
  v_to     timestamptz;   -- exclusive
  v_year   integer;
  v_result jsonb;
BEGIN
  IF interval_type IS NOT NULL AND interval_type NOT IN ('month', 'quarter', 'year', 'date') THEN
    RAISE EXCEPTION 'interval_type must be one of month, quarter, year, date (got %)', interval_type
      USING ERRCODE = '22023';
  END IF;
  IF filter_quarter IS NOT NULL AND filter_quarter NOT BETWEEN 1 AND 4 THEN
    RAISE EXCEPTION 'filter_quarter must be 1-4' USING ERRCODE = '22023';
  END IF;
  IF filter_month IS NOT NULL AND filter_month NOT BETWEEN 1 AND 12 THEN
    RAISE EXCEPTION 'filter_month must be 1-12' USING ERRCODE = '22023';
  END IF;

  -- Resolve the reporting window. NULL window = all time.
  v_year := COALESCE(filter_year, EXTRACT(YEAR FROM now())::integer);

  IF interval_type = 'date' OR (filter_start_date IS NOT NULL OR filter_end_date IS NOT NULL) THEN
    v_from := filter_start_date::timestamptz;
    v_to   := (filter_end_date + 1)::timestamptz;           -- end date is inclusive
  ELSIF interval_type = 'month' AND filter_month IS NOT NULL THEN
    v_from := make_date(v_year, filter_month, 1)::timestamptz;
    v_to   := (make_date(v_year, filter_month, 1) + interval '1 month')::timestamptz;
  ELSIF interval_type = 'quarter' AND filter_quarter IS NOT NULL THEN
    v_from := make_date(v_year, (filter_quarter - 1) * 3 + 1, 1)::timestamptz;
    v_to   := (make_date(v_year, (filter_quarter - 1) * 3 + 1, 1) + interval '3 months')::timestamptz;
  ELSIF interval_type = 'year' AND filter_year IS NOT NULL THEN
    v_from := make_date(v_year, 1, 1)::timestamptz;
    v_to   := make_date(v_year + 1, 1, 1)::timestamptz;
  END IF;

  WITH
  -- Projects in scope: the chosen project and/or any project located in the chosen region.
  scoped_projects AS (
    SELECT p.*
    FROM projects p
    WHERE (project_uuid IS NULL OR p.id = project_uuid)
      AND (region_uuid IS NULL OR EXISTS (
            SELECT 1 FROM project_locations pl
            WHERE pl.project_id = p.id AND pl.region_id = region_uuid))
  ),
  scoped_activities AS (
    SELECT a.*
    FROM activities a
    WHERE (project_uuid IS NULL OR a.project_id = project_uuid)
      AND (region_uuid IS NULL OR EXISTS (
            SELECT 1 FROM activity_locations al
            WHERE al.activity_id = a.id AND al.region_id = region_uuid))
      AND (v_from IS NULL OR a.start_date >= v_from::date)
      AND (v_to   IS NULL OR a.start_date <  v_to::date)
  ),
  -- Beneficiaries reached: filtered through activities when a project/period is set,
  -- otherwise all beneficiaries (optionally limited to a region).
  scoped_beneficiaries AS (
    SELECT b.id, b.region_id
    FROM beneficiaries b
    WHERE (region_uuid IS NULL OR b.region_id = region_uuid)
      AND (
        (project_uuid IS NULL AND v_from IS NULL)
        OR EXISTS (
          SELECT 1
          FROM activity_beneficiaries ab
          JOIN scoped_activities sa ON sa.id = ab.activity_id
          WHERE ab.beneficiary_id = b.id)
      )
  ),
  scoped_incidents AS (
    SELECT i.id, i.region_id
    FROM incidents i
    WHERE (region_uuid IS NULL OR i.region_id = region_uuid)
      AND (v_from IS NULL OR i.created_at >= v_from)
      AND (v_to   IS NULL OR i.created_at <  v_to)
  ),
  -- cases.submitted_by references beneficiaries (see update_cases_submitted_by_to_beneficiaries).
  scoped_cases AS (
    SELECT c.id, b.region_id
    FROM cases c
    LEFT JOIN beneficiaries b ON b.id = c.submitted_by
    WHERE (region_uuid IS NULL OR b.region_id = region_uuid)
      AND (v_from IS NULL OR c.created_at >= v_from)
      AND (v_to   IS NULL OR c.created_at <  v_to)
  ),
  project_rows AS (
    SELECT
      sp.id,
      sp.title,
      sp.start_date,
      sp.end_date,
      sp.status::text AS status,
      (SELECT count(*) FROM scoped_activities a WHERE a.project_id = sp.id) AS total_activities,
      (SELECT count(*) FROM scoped_activities a
         WHERE a.project_id = sp.id AND a.status::text = 'Completed') AS completed_activities,
      (SELECT count(DISTINCT ab.beneficiary_id)
         FROM scoped_activities a
         JOIN activity_beneficiaries ab ON ab.activity_id = a.id
         WHERE a.project_id = sp.id) AS total_beneficiaries
    FROM scoped_projects sp
  ),
  region_rows AS (
    SELECT
      r.id,
      r.name,
      (SELECT count(*) FROM scoped_beneficiaries x WHERE x.region_id = r.id) AS beneficiaries,
      (SELECT count(*) FROM scoped_incidents     x WHERE x.region_id = r.id) AS incidents,
      (SELECT count(*) FROM scoped_cases         x WHERE x.region_id = r.id) AS cases,
      (SELECT count(DISTINCT pl.project_id)
         FROM project_locations pl
         JOIN scoped_projects sp ON sp.id = pl.project_id
         WHERE pl.region_id = r.id) AS projects
    FROM regions r
    WHERE region_uuid IS NULL OR r.id = region_uuid
  )
  SELECT jsonb_build_object(
    'summary', jsonb_build_object(
      'global', jsonb_build_object(
        'total_users',         (SELECT count(*) FROM users),
        'total_projects',      (SELECT count(*) FROM scoped_projects),
        'total_regions',       (SELECT count(*) FROM region_rows),
        'total_activities',    (SELECT count(*) FROM scoped_activities),
        'total_beneficiaries', (SELECT count(*) FROM scoped_beneficiaries),
        'total_incidents',     (SELECT count(*) FROM scoped_incidents),
        'total_cases',         (SELECT count(*) FROM scoped_cases),
        'active_projects',     (SELECT count(*) FROM scoped_projects WHERE status::text IN ('Active', 'Ongoing')),
        'completed_projects',  (SELECT count(*) FROM scoped_projects WHERE status::text = 'Completed')
      ),
      'projects', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
                 'project_id',           pr.id,
                 'title',                pr.title,
                 'total_activities',     pr.total_activities,
                 'completed_activities', pr.completed_activities,
                 'total_beneficiaries',  pr.total_beneficiaries,
                 'start_date',           pr.start_date,
                 'end_date',             pr.end_date,
                 'status',               pr.status
               ) ORDER BY pr.title)
        FROM project_rows pr), '[]'::jsonb),
      'regions', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
                 'region_id',     rr.id,
                 'region_name',   rr.name,
                 'beneficiaries', rr.beneficiaries,
                 'incidents',     rr.incidents,
                 'cases',         rr.cases,
                 'projects',      rr.projects
               ) ORDER BY rr.name)
        FROM region_rows rr), '[]'::jsonb)
    )
  )
  INTO v_result;

  RETURN v_result;
END;
$$;

COMMENT ON FUNCTION public.rpc_get_admin_dashboard(uuid, uuid, text, integer, integer, integer, date, date)
  IS 'Admin dashboard overview: global totals plus per-project and per-region summaries. Optional project/region/period filters.';

CREATE OR REPLACE FUNCTION public.rpc_get_projects_with_regions()
RETURNS jsonb
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(jsonb_agg(
           jsonb_build_object(
             'project_id',   p.id,
             'project_name', p.title,
             'regions', COALESCE((
               SELECT jsonb_agg(jsonb_build_object('id', r.id, 'name', r.name) ORDER BY r.name)
               FROM (SELECT DISTINCT pl.region_id
                     FROM project_locations pl
                     WHERE pl.project_id = p.id AND pl.region_id IS NOT NULL) x
               JOIN regions r ON r.id = x.region_id
             ), '[]'::jsonb)
           ) ORDER BY p.title), '[]'::jsonb)
  FROM projects p;
$$;

COMMENT ON FUNCTION public.rpc_get_projects_with_regions()
  IS 'All projects with the regions they are located in, as [{project_id, project_name, regions:[{id,name}]}].';

-- These expose aggregate admin data: service role only (the backend uses it).
REVOKE ALL ON FUNCTION public.rpc_get_admin_dashboard(uuid, uuid, text, integer, integer, integer, date, date) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.rpc_get_projects_with_regions() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rpc_get_admin_dashboard(uuid, uuid, text, integer, integer, integer, date, date) TO service_role;
GRANT EXECUTE ON FUNCTION public.rpc_get_projects_with_regions() TO service_role;

-- Make PostgREST pick up the new functions immediately.
NOTIFY pgrst, 'reload schema';
