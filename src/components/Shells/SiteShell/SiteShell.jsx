import React from "react";
import SideNav from "./components/SideNav";
import { Outlet } from "react-router-dom";

export function SiteShell() {
  return (
    <div className="app">
      <SideNav items={navItems} />

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