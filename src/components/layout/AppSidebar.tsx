"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../../context/SidebarContext";
import {
  ChevronDownIcon,
  GridIcon,
  FolderIcon,
  DocsIcon,
  TaskIcon,
  UserIcon,
  BriefcaseIcon,
  SettingsIcon,
} from "../../icons/index";

type SubItem = {
  name: string;
  path: string;
  permission?: string | null;
};

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  permission?: string | null;
  subItems?: SubItem[];
  /** Thin rule between groups (no label, to keep the menu short) */
  divider?: boolean;
};

// Related pages are nested under one parent so the menu stays short.
const navItems: NavItem[] = [
  { name: "Dashboard", path: "/", icon: <GridIcon />, permission: null },

  {
    name: "Programs",
    icon: <FolderIcon />,
    subItems: [
      { name: "Projects", path: "/projects", permission: "project_view" },
      { name: "Activities", path: "/activities", permission: "activity_view" },
      { name: "Beneficiaries", path: "/beneficiaries", permission: "beneficiary_view" },
    ],
  },
  {
    name: "Cases & Incidents",
    icon: <BriefcaseIcon />,
    subItems: [
      { name: "Cases", path: "/cases", permission: "case_view" },
      { name: "Incidents", path: "/incidents", permission: "incident_view" },
    ],
  },
  {
    name: "Content Manager",
    path: "/content",
    icon: <DocsIcon />,
    permission: "content_manage",
  },

  { name: "divider-1", divider: true },

  { name: "Jobs", path: "/jobs", icon: <TaskIcon />, permission: "jobs_view" },
  {
    name: "Users",
    icon: <UserIcon />,
    subItems: [
      { name: "All Users", path: "/users", permission: "user_view" },
      { name: "Team Members", path: "/users/team-members", permission: "user_view" },
    ],
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    subItems: [
      { name: "Roles & Permissions", path: "/settings/roles", permission: "role_view" },
      { name: "Categories", path: "/settings/categories", permission: "settings_manage" },
      { name: "Locations", path: "/settings/locations", permission: "settings_manage" },
      { name: "Constants", path: "/settings/constants", permission: "settings_manage" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(navItems.filter((n) => n.subItems).map((n) => n.name))
  );

  const showText = isExpanded || isHovered || isMobileOpen;

  // Does `path` match the current URL (including nested routes like /projects/123)?
  const matches = useCallback(
    (path: string) =>
      path === "/"
        ? pathname === "/"
        : pathname === path || pathname.startsWith(`${path}/`),
    [pathname]
  );

  // Within one group only the most specific match is active
  // (so /users/team-members does not also light up /users).
  const activeSubPath = useCallback(
    (subItems: SubItem[]) =>
      subItems
        .filter((s) => matches(s.path))
        .sort((a, b) => b.path.length - a.path.length)[0]?.path ?? null,
    [matches]
  );

  // Permissions are disabled for now: every page is listed for every signed-in user.
  // (The `permission` fields above are kept so filtering can be turned back on later.)
  const visibleItems = navItems;

  // Make sure the group containing the current page is open
  useEffect(() => {
    const active = visibleItems.find((n) => n.subItems?.some((s) => matches(s.path)));
    if (active) {
      setOpenGroups((cur) => (cur.has(active.name) ? cur : new Set(cur).add(active.name)));
    }
  }, [pathname, visibleItems, matches]);

  const toggleGroup = (name: string) =>
    setOpenGroups((cur) => {
      const next = new Set(cur);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <aside
      className={`fixed top-0 left-0 z-50 flex h-screen h-dvh flex-col border-r border-gray-200 bg-white text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200
        ${
          isExpanded || isMobileOpen || isHovered
            ? "w-[250px] px-3 lg:px-4"
            : "w-[90px] px-3 lg:px-5"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden shrink-0 py-6 lg:flex ${
          !showText ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {showText ? (
            <>
              <Image className="dark:hidden" src="/images/logo/logo-icon.png" alt="Logo" width={150} height={40} />
              <Image className="hidden dark:block" src="/images/logo/logo-dark.png" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <Image src="/images/logo/logo-icon.png" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      {/* Scroll area: takes the remaining height and scrolls when the list is long */}
      <nav
        aria-label="Main navigation"
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6 pt-4 [scrollbar-width:thin] lg:pt-0"
      >
        <ul className="flex flex-col gap-1">
          {visibleItems.map((nav) => {
            if (nav.divider) {
              return (
                <li key={nav.name} role="separator" className="my-2 border-t border-gray-200 dark:border-gray-800" />
              );
            }

            if (nav.subItems) {
              const isOpen = openGroups.has(nav.name) && showText;
              const hasActiveChild = nav.subItems.some((s) => matches(s.path));
              const activeSub = activeSubPath(nav.subItems);
              return (
                <li key={nav.name}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(nav.name)}
                    aria-expanded={isOpen}
                    title={!showText ? nav.name : undefined}
                    className={`menu-item group cursor-pointer ${
                      hasActiveChild ? "menu-item-active" : "menu-item-inactive"
                    } ${!showText ? "lg:justify-center" : "lg:justify-start"}`}
                  >
                    <span className={hasActiveChild ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                      {nav.icon}
                    </span>
                    {showText && <span className="menu-item-text">{nav.name}</span>}
                    {showText && (
                      <ChevronDownIcon
                        className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {showText && (
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="ml-5 mt-1 space-y-0.5 border-l border-gray-200 pl-3 dark:border-gray-800">
                          {nav.subItems.map((sub) => (
                            <li key={sub.path}>
                              <Link
                                href={sub.path}
                                tabIndex={isOpen ? 0 : -1}
                                className={`menu-dropdown-item ${
                                  activeSub === sub.path
                                    ? "menu-dropdown-item-active"
                                    : "menu-dropdown-item-inactive"
                                }`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            }

            if (!nav.path) return null;
            const active = matches(nav.path);
            return (
              <li key={nav.name}>
                <Link
                  href={nav.path}
                  title={!showText ? nav.name : undefined}
                  className={`menu-item group ${
                    active ? "menu-item-active" : "menu-item-inactive"
                  } ${!showText ? "lg:justify-center" : ""}`}
                >
                  <span className={active ? "menu-item-icon-active" : "menu-item-icon-inactive"}>
                    {nav.icon}
                  </span>
                  {showText && <span className="menu-item-text">{nav.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AppSidebar;
