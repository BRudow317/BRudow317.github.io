import { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NavItems, type NavItem } from "../../constants/NavItems";
import image from "../../assets/images/Headshot.png";
import { getComponentHeight } from "../../utils/getComponentHeight";
import { DataContextSelector } from "./DataContextSelector";
import type { ScreenSize } from "../../context/BreakpointContext";

type SideNavProps = {
  topOffset?: number;
  bottomOffset?: number;
  screenSize?: ScreenSize;
  topBarHeight?: number;
};

export function SideNav({
  topOffset = 60,
  bottomOffset = 201,
  screenSize = "lg",
}: SideNavProps = {}) {
  const isSmallScreen = screenSize === "xsm" || screenSize === "sm";
  const navItems: NavItem[] = NavItems;

  const borderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateBorder = () => {
      const borderEl = borderRef.current;
      if (!borderEl) return;
      const footerHeight = getComponentHeight("footer");
      const topbarHeight = getComponentHeight("topbar");
      if (footerHeight !== null) borderEl.style.bottom = `${footerHeight - 2}px`;
      if (topbarHeight !== null) borderEl.style.top = `${topbarHeight - 2}px`;
    };

    const footer = document.getElementById("footer");
    const topbar = document.getElementById("topbar");
    const observer = new ResizeObserver(updateBorder);
    if (footer) observer.observe(footer);
    if (topbar) observer.observe(topbar);

    updateBorder();

    return () => observer.disconnect();
  }, []);

  const styles = {
    SideNav: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      backgroundColor: "var(--bg-2)",
      padding: "18px",
      paddingTop: "12px",
      // minHeight: "100%",
      boxSizing: "border-box",
      width: isSmallScreen ? "100%" : "auto",
    },

    SideNavBorderOverlay: {
      position: "absolute",
      top: `${topOffset}px`, // adjust for border
      bottom: `${bottomOffset}px`, // adjust for border
      right: 0,
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
      width: isSmallScreen ? "auto" : "100%",
      height: isSmallScreen ? "auto" : "110px",
      borderRadius: "999px",
    },

    Avatar: {
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      width: isSmallScreen ? "100%" : "120px",
      height: isSmallScreen ? "auto" : "120px",
      maxWidth: "300px",
      borderRadius: "999px",
      // objectFit: "contain",
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
    Selector: {
      marginTop: "auto",
    },
  };

  let SideNavComponent = (
    <nav style={styles.SideNav} aria-label="Primary Site Navigation">
      <div ref={borderRef} style={styles.SideNavBorderOverlay} />
      <div style={styles.AvatarShell}>
        <img src={image} alt="Headshot" style={styles.Avatar} />
      </div>

      <div style={styles.NavGroup}>
        {navItems.filter((x) => x.group === "Top").map((x) => (
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
        {navItems.filter((x) => x.group === "Projects").map((x) => (
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

      <div className="divider" />
      <DataContextSelector style={styles.Selector} />
    </nav>
  );

  // Small screen styles and output
  if (screenSize === "xsm" || screenSize === "sm") {
    SideNavComponent = (
      <nav style={styles.SideNav} aria-label="Primary Site Navigation">
        <div style={styles.AvatarShell}>
          <img src={image} alt="Headshot" style={styles.Avatar} />
        </div>

        <div style={styles.NavGroup}>
          {navItems.filter((x) => x.group === "Top").map((x) => (
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
          {navItems.filter((x) => x.group === "Projects").map((x) => (
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
        <div className="divider" />
        <DataContextSelector style={styles.Selector} />
      </nav>
    );
  }

  return SideNavComponent;
}
