import { NavLink } from "react-router-dom";
import { NavItems } from "./NavItems";
import image from "../../assets/images/Headshot.png";

export function SideNav({
  topBarHeight = 60, 
  screenSize = "lg",
  
  } = {}) {
    let isSmallScreen = screenSize === "xsm" || screenSize === "sm";

  let borderOffset = (() => {
    switch(screenSize) {
      case "md" : return topBarHeight - 2;
      case "lg": return topBarHeight - 2;
      case "xl": return topBarHeight - 2;
      case "2xl" : return topBarHeight + 4;
      default: return topBarHeight;
    }
  })();
let styles = {
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
        top: `${borderOffset}px`, // adjust for border
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
        width: isSmallScreen ? "auto" :  "100%",
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
    } ;

  let SideNavComponent = 
    <nav style={styles.SideNav} aria-label="Primary Site Navigation">
        <div style={styles.SideNavBorderOverlay} />
        <div style={styles.AvatarShell}>
          <img src={image} alt="Headshot" style={styles.Avatar} />
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
      </nav>;

  // Small screen styles and output
  if (screenSize === "xsm" || screenSize === "sm") {

    SideNavComponent =
      <nav style={styles.SideNav} aria-label="Primary Site Navigation">
        <div style={styles.AvatarShell}>
          <img src={image} alt="Headshot" style={styles.Avatar} />
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
    ;
  } 

  return SideNavComponent;
}
