import React from "react";
import { Link } from "react-router-dom";

export function Intro() {
  return (
    <section className="screen" aria-label="Intro">
      <div className="hero">
        <h1 className="hero_title">Blaine Rudow</h1>
        <p className="hero_subtitle">Full Stack Engineer • Web Design</p>

        <p className="hero_summary">
          Welcome to my GitHub. I'm an engineer in Indianapolis building web systems
          and automation tools.
        </p>

        <div className="hero_actions">
          <Link className="btn btn--primary" to="/resume">View resume</Link>
          <Link className="btn" to="/projects/quickbitlabs">View projects</Link>
        </div>

        <div className="hero_meta">
          <span className="pill">Indianapolis, IN</span>
          {/* <span className="pill">Open to: Remote/Hybrid</span> */}
          <span className="pill">Focus: Systems + Integration</span>
          <span className="pill">Infrastructure: AWS</span>
        </div>
      </div>

      <div className="card">
        <div className="card_title">What I build</div>
        <ul className="list">
          <li>Professional User Interfaces</li>
          <li>Search Engine Optimization that supports your business</li>
          <li>Security you can trust to protect your business and reputation</li>
        </ul>
      </div>
    </section>
  );
}
