import { NavLink } from "react-router-dom";
import { NavItems } from "./NavItems";
import image from "../../assets/images/LinuxPenguin.jpg";



export function SideNav() {
  const topBarHeight = "62px";

  const styles = {
    SideNav: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      backgroundColor: "var(--bg-2)",
      padding: "18px",
      paddingTop: "12px",
    },

    SideNavBorderOverlay: {
      position: "absolute",
      top: topBarHeight,
      right: 0,
      bottom: 0,
      width: "2px",
      backgroundColor: "var(--border-1)",
      pointerEvents: "none",
    },

    NavGroup: { display: "flex", flexDirection: "column", gap: "6px" },

    NavGroupTitle: {
      fontSize: "16px",
      color: "var(--text-1)",
      textShadow: "var(--text-shadow-1)",
      padding: "6px 10px",
    },

    AvatarShell: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: "110px",
      borderRadius: "999px",
      

    },

    Avatar: {
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      width: "100px",
      height: "100px",
      borderRadius: "999px",
      objectFit: "contain",
      aspectRatio: "1 / 1",
      border: "1px solid var(--border-1)",
      
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
      <div style={styles.SideNavBorderOverlay} />
      <div style={styles.AvatarShell}>
        <img
          src={image}
          alt="Penguin Avatar"
          style={styles.Avatar}
        />
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
