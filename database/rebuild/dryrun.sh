#!/bin/bash
# Applies the rebuilt base schema and all migrations to $DBURL in ONE transaction.
# Usage: dryrun.sh          -> runs everything, then ROLLBACK (nothing is kept)
#        dryrun.sh commit   -> runs everything, then COMMIT
# Run from the repository root.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/../.." && pwd)"
{
  echo '\set ON_ERROR_STOP on'
  echo 'BEGIN;'
  echo "\\echo === 0000_base_schema.sql"
  echo "\\i $here/0000_base_schema.sql"
  for f in "$here"/portal/0*.sql; do
    echo "\\echo === portal/$(basename "$f")"
    echo "\\i $f"
  done
  while read -r f; do
    [ -z "$f" ] && continue
    echo "\\echo === $f"
    echo "\\i $root/migrations/$f"
  done < "$here/order.txt"
  if [ -f "$here/9999_missing_objects.sql" ]; then
    echo "\\echo === 9999_missing_objects.sql"
    echo "\\i $here/9999_missing_objects.sql"
  fi
  if [ "${1:-}" = commit ]; then echo 'COMMIT;'; else echo 'ROLLBACK;'; fi
} > /tmp/run.sql
psql "$DBURL" -X -q -f /tmp/run.sql 2>&1 | grep -E '^===|ERROR|LINE|DETAIL|HINT|CONTEXT|psql:' | tail -30
