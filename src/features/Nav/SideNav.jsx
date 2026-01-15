import React from "react";
import { NavLink } from "react-router-dom";
import { NavItems } from "./NavItems";
import image from "../../assets/images/LinuxPenguin.jpg";



export function SideNav() {
  const styles = {
    SideNav: {
      // borderRight: "1px solid var(--border-1)",
      backgroundColor: "var(--bg-2)",
      padding: "18px",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },

    NavGroup: { display: "flex", flexDirection: "column", gap: "6px" },

    NavGroupTitle: {
      fontSize: "16px",
      color: "var(--text-1)",
      textShadow: "var(--text-shadow-1)",
      padding: "6px 10px",
    },

    Brand: {
      display: "flex",
      gap: "12px",
      // alignItems: "center",
      padding: "10px",
      border: "1px solid var(--border-1)",
      borderRadius: "var(--radius)",
      backgroundColor: "var(--bg-2)",
      boxShadow: "var(--box-shadow-1)",
    },

    AvatarShell: {
      width: "40px",
      height: "40px",
      borderRadius: "999px",
      border: "1px solid var(--border-1)",
      background:
        "linear-gradient(180deg, rgba(125, 133, 144, 0.25), rgba(125, 133, 144, 0.05))",
    },

    Avatar: {
      width: "100%",
      height: "100%",
      borderRadius: "999px",
      objectFit: "contain",
      
    },

    BrandName: {
      fontWeight: 650,
      letterSpacing: "-0.01em",
    },

    BrandMeta: {
      fontSize: "12px",
      color: "var(--text-1)",
      textShadow: "var(--text-shadow)",
      marginTop: "2px",
    },
  };

  return (
    <nav style={styles.SideNav} aria-label="Primary">
      <div style={styles.Brand}>
        <div style={styles.AvatarShell} >
          {/* Avatar */}
          <img 
            src={image}
            alt="Penguin Avatar"
            style={styles.Avatar}  
          />
        </div>
        
      </div>

      <div style={styles.NavGroup}>
        {NavItems.filter((x) => x.group === "Top").map((x) => (
          <NavLink
            key={x.key}
            to={x.to}
            end={x.to === "/"}
            className={({ isActive }) =>
              `navitem ${isActive ? "is-active" : ""}`
            }
          >
            {x.label}
          </NavLink>
        ))}
      </div>

      <div className="divider" />

      <div style={styles.NavGroup}>
        {NavItems.filter((x) => x.group === "Projects").map((x) => (
          <NavLink
            key={x.key}
            to={x.to}
            end={x.to === "/projects"}
            className={({ isActive }) =>
              `navitem ${isActive ? "is-active" : ""}`
            }
          >
            {x.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
