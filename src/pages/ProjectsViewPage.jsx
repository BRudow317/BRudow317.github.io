import { NavLink } from "react-router";
import { PROJECT_DATA } from "../constants/PROJECT_DATA";

const ProjectItems = [
  ...PROJECT_DATA.map((p) => ({
    key: p.id,
    label: p.name,
    tagline: p.tagline,
    description: p.description,
    highlights: p.highlights,
    stack: p.stack,
    links: p.links,
    group: "Projects",
    to: `/projects/${p.id}`,
  })),
];

export function ProjectsViewPage() {
  const styles = {
    Screen: { display: "flex", 
    flexDirection: "column", 
    gap: "14px" 
    },

    ScreenHeader: {
      margin: 0,
      fontSize: "18px",
      letterSpacing: "-0.01em",
    },

    ProjectList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },

    ProjectRow: {
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      borderBottom: "1px solid var(--border-1)",
      margin: "8px 0",
      paddingBottom: "8px",
      width: "auto",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      //justifyContent: "center",
      alignContent: "center",
      minWidth: 0,
    },
    HighlightList: {
      display: "flex",
      flexDirection: "column",
      alignContent: "flex-start",
      justifyContent: "center",
      gap: "4px",
      listStyleType: "none",
      margin: "0",
      padding: "0",
    },
    highlights: {
      margin: "0",
    },
    desc: {
      margin: "0",
      // textAlign: "center",
    }
  };

  return (
    <section style={styles.Screen} aria-label="Projects Overview">
      <header style={styles.ScreenHeader}>
        <h2 style={styles.ScreenHeader}>Projects Overview</h2>
        <div className="muted">A collection of my work</div>
      </header>

      <div className="card">
        <ul style={styles.ProjectList}>
          {ProjectItems.filter((project) => project.group === "Projects").map(
            (project, index, arr) => (
              <li
                key={project.key}
                style={{
                  ...styles.ProjectRow,
                  ...(index === arr.length - 1 ? { borderBottom: 'none', marginBottom: 0 } : {})
                }}
              >

                {/* Name */}
                <div style={{ ...styles.field, flex: 2 }}>
                  <NavLink to={project.to}>{project.label}</NavLink>
                </div>

                {/* Description */}
                <div style={{ ...styles.field, flex: 3 }}>
                  <p style={styles.desc}>{project.tagline}</p>
                </div>

                {/* Highlights */}
                <div className="split" style={{ ...styles.field, flex: 2, marginTop: 0, }}>
                  <ul style={styles.HighlightList}>
                    {project.highlights.map((h) => (
                      <li 
                        key={h}
                        style={styles.highlights}  
                      >{h}</li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div style={{ ...styles.field, flex: 2 }}>
                  <div className="chips">
                    {project.stack.map((s) => (
                      <span className="chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
        
      </div>
    </section>
  );
}
