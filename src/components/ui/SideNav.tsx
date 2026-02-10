import { useRef, useEffect } from "react";
import { NavLink, useMatch } from "react-router";
// import { NavItems, type NavItem } from "../../constants/NavItems";
import image from "../../assets/images/Headshot.png";
import { getComponentHeight } from "../../utils/getComponentHeight";
import { DataContextSelector } from "./DataContextSelector";
import { ScreenSize } from "../../context/BreakpointContext";
// import { ChevronDown, ChevronUp } from "lucide-react";
import { PROJECT_DATA, type ProjectItem } from "../../constants/PROJECT_DATA";
import { DEMO_DATA, type DemoItem } from "../../constants/DEMO_DATA";
import { RESEARCH_DATA, type ResearchItem } from "../../constants/RESEARCH_DATA";

type NavItem = {
  key: string;
  label: string;
  group: "Top" | "Projects" | "Research" | "Demo";
  to: string;
  isCollapsible?: boolean;

};

type SideNavProps = {
  topOffset?: number;
  bottomOffset?: number;
  screenSize?: ScreenSize;
  topBarHeight?: number;
};

const projectNavItems = (PROJECT_DATA as ProjectItem[]).map((project) => ({
  key: project.id,
  label: project.name,
  group: "Projects" as const,
  to: `/projects/${project.id}`,
}));

const DemoNavItems = (DEMO_DATA as DemoItem[]).map((demo) => ({
  key: demo.id,
  label: demo.name,
  group: demo.group,
  to: `${demo.parent}${demo.page}`,
}));

const ResearchNavItems = (RESEARCH_DATA as ResearchItem[]).map((research) => ({
  key: research.id,
  label: research.name,
  group: research.group,
  to: `${research.parent}${research.page}`,
})); 

const NavItems: NavItem[] = [
  { key: "welcome", label: "Welcome", group: "Top", to: "/", isCollapsible: false},
  { key: "resume", label: "Resume", group: "Top", to: "/resume", isCollapsible: false },
  { key: "projectsview", label: "Projects", group: "Top", to: "/projects", isCollapsible: true },
  { key: "research", label: "Research Hub", group: "Top", to: "/research", isCollapsible: true },
  { key: "demo", label: "Live Demonstrations", group: "Top", to: "/demo", isCollapsible: true },
  
  ...projectNavItems,
  ...DemoNavItems,
  ...ResearchNavItems,
];


export function SideNav({
  topOffset = 60,
  bottomOffset = 201,
  screenSize = "lg",
}: SideNavProps = {}) {
  const isSmallScreen: boolean = screenSize === "xsm" || screenSize === "sm";
  const navItems: NavItem[] = NavItems;
  // const location = useLocation();
  // node_modules\react-router\dist\development\index.d.mts
  const showProjects = Boolean(useMatch("/projects/*"));
  const showResearch = Boolean(useMatch("/research/*"));
  const showDemo = Boolean(useMatch("/demo/*"));
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

  const styles: { [key: string]:React.CSSProperties } = {
    SideNav: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      backgroundColor: "var(--bg-2)",
      padding: "18px",
      paddingTop: "12px",
      boxSizing: "border-box",
      width: isSmallScreen ? "100%" : "auto",
    },

    SideNavBorderOverlay: {
      position: "absolute",
      top: `${topOffset}px`,
      bottom: `${bottomOffset}px`,
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
      width: isSmallScreen ? "100%" : "120px",
      height: isSmallScreen ? "auto" : "120px",
      maxWidth: "300px",
      borderRadius: "999px",
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
      textShadow: "var(--text-shadow-1)",
      marginTop: "2px",
    },
    Selector: {
      marginTop: "auto",
    },
  };

  const SideNavComponent = (
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
      {showProjects && (
          <div style={styles.NavGroup} aria-label="Projects Dropdown">
            {navItems.filter((x) => x.group === "Projects").map((x) => (
              <NavLink
                key={x.key}
                to={x.to}
                end={x.to === "/projects"}
                className={({ isActive }) =>
                  `navitem ${isActive ? "is-active" : ""}`
                }
                aria-label={`Project ${x.label}`}
              >
                {x.label}
              </NavLink>
            ))}
          </div>
      )}
      {showResearch && (
          <div style={styles.NavGroup} aria-label="Research Group">
            {navItems.filter((x) => x.group === "Research").map((x) => (
              <NavLink
                key={x.key}
                to={x.to}
                end={x.to === "/research"}
                className={({ isActive }) =>
                  `navitem ${isActive ? "is-active" : ""}`
                }
                aria-label={`Research ${x.label}`}
              >
                {x.label}
              </NavLink>
            ))}
          </div>
      )}
      {showDemo && (
          <div style={styles.NavGroup} aria-label="Demo Group">
            {navItems.filter((x) => x.group === "Demo").map((x) => (
              <NavLink
                key={x.key}
                to={x.to}
                end={x.to === "/demo"}
                className={({ isActive }) =>
                  `navitem ${isActive ? "is-active" : ""}`
                }
                aria-label={`Demonstration ${x.label}`}
              >
                {x.label}
              </NavLink>
            ))}
          </div>
      )}

      <div className="divider" />
      <DataContextSelector style={styles.Selector} />
    </nav>
  );








  // Small screen styles and output
  // if (screenSize === "xsm" || screenSize === "sm") {
  //   SideNavComponent = (
  //     <nav style={styles.SideNav} aria-label="Primary Site Navigation">
  //       <div style={styles.AvatarShell} aria-label="Profile Picture">
  //         <img src={image} alt="Headshot" style={styles.Avatar} />
  //       </div>

  //       <div style={styles.NavGroup} aria-label="Top Navigation">
  //         {navItems.filter((x) => x.group === "Top").map((x) => (
  //           <NavLink
  //             key={x.key}
  //             to={x.to}
  //             end={x.to === "/"}
  //             className={({ isActive }) =>
  //               `navitem ${isActive ? "is-active" : ""}`
  //             }
  //           >
  //             {x.label}
  //           </NavLink>
  //         ))}
  //       </div>

  //       <div className="divider" />

  //       <div style={styles.NavGroup} aria-label="Projects Navigation">
  //         {navItems.filter((x) => x.group === "Projects").map((x) => (
  //           <NavLink
  //             key={x.key}
  //             to={x.to}
  //             end={x.to === "/projects"}
  //             className={({ isActive }) =>
  //               `navitem ${isActive ? "is-active" : ""}`
  //             }
  //           >
  //             {x.label}
  //           </NavLink>
  //         ))}
  //       </div>
  //       <div className="divider" />
  //       <DataContextSelector style={styles.Selector} />
  //     </nav>
  //   );
  // }

  return SideNavComponent;
}
