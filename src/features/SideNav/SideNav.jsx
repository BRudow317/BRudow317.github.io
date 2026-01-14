import React from "react";
import { NavLink } from "react-router-dom";
 

export function SideNav({ items }) {
  return (
    <nav className="sidenav" aria-label="Primary">
      <div className="brand">
        <div className="brand__avatar" aria-hidden="true" />
        <div className="brand__text">
          <div className="brand__name">Blaine Rudow</div>
          <div className="brand__meta">Full Stack Engineer</div>
        </div>
      </div>

      <div className="navgroup">
        {items
          .filter((x) => x.group === "Top")
          .map((x) => (
            <NavLink
              key={x.key}
              to={x.to}
              end={x.to === "/"}
              className={({ isActive }) => `navitem ${isActive ? "is-active" : ""}`}
            >
              {x.label}
            </NavLink>
          ))}
      </div>

      <div className="divider" />

      <div className="navgroup">
        <div className="navgroup__title">Projects</div>
        {items
          .filter((x) => x.group === "Projects")
          .map((x) => (
            <NavLink
              key={x.key}
              to={x.to}
              className={({ isActive }) => `navitem ${isActive ? "is-active" : ""}`}
            >
              {x.label}
            </NavLink>
          ))}
      </div>

      <div className="sidenav__footer">
        <a className="link" href="https://github.com/BRudow317" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span className="dot" aria-hidden="true">•</span>
        <a className="link" href="https://www.linkedin.com/in/blaine-rudow/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span className="dot" aria-hidden="true">•</span>
        <a className="link" href="mailto:blainerudow@gmail.com">
          Email
        </a>
      </div>
    </nav>
  );
}
