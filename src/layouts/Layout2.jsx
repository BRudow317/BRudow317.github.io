import React, { useMemo } from "react";
import { SideNav } from "../features/SideNav/SideNav.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { projects } from "../constants/projects";

export function Layout2() {
const NavItems = [
  { key: "intro", label: "Intro", group: "Top", to: "/" },
  { key: "resume", label: "Resume", group: "Top", to: "/resume" },
  ...projects.map((p) => ({
    key: p.id,
    label: p.name,
    group: "Projects",
    to: `/projects/${p.id}`,
  })),
];


  
  const location = useLocation();

  const activeLabel = useMemo(() => {
    const path = location.pathname;
    const match = NavItems.find((x) => x.to === path);
    if (match) return match.label;

    if (path.startsWith("/projects/")) {
      const id = path.split("/")[2] || "";
      const p = projects.find((x) => x.id === id);
      return p ? p.name : "Projects";
    }

    return "Intro";
  }, [location.pathname]);


  return (
    <div className="app">
      <SideNav items={NavItems} />

      <main className="main" role="main">
        <div className="topbar">
          <div className="topbar_crumb">
            <span className="muted">/</span> <span>{activeLabel}</span>
          </div>
        </div>

        <div className="content">
          <div className="fadein" key={location.pathname}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
