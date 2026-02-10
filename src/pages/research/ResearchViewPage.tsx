import { type CSSProperties } from "react";
import { NavLink } from "react-router";
import { RESEARCH_DATA } from "../../constants/RESEARCH_DATA";

const ResearchItems = [
  ...RESEARCH_DATA.map((p) => ({
    key: p.id,
    label: p.name,
    description: p.description,
    links: p.links,
    group: "Research",
    to: `${p.parent}${p.page}`,
  })),
];

export function ResearchViewPage() {
  const styles: Record<string, CSSProperties> = {
    Screen: { display: "flex", 
    flexDirection: "column", 
    gap: "14px" 
    },

    ScreenHeader: {
      margin: 0,
      fontSize: "18px",
      letterSpacing: "-0.01em",
    },

    ResearchList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },

    ResearchRow: {
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
    <section style={styles.Screen} aria-label="Research Overview">
      <header style={styles.ScreenHeader}>
        <h2 style={styles.ScreenHeader}>Research Overview</h2>
        <div className="muted">A collection of my work</div>
      </header>

      <div className="card">
        <ul style={styles.ResearchList}>
          {ResearchItems.filter((research) => research.group === "Research").map(
            (research, index, arr) => (
              <li
                key={research.key}
                style={{
                  ...styles.ResearchRow,
                  ...(index === arr.length - 1 ? { borderBottom: 'none', marginBottom: 0 } : {})
                }}
              >

                {/* Name */}
                <div style={{ ...styles.field, flex: 2 }}>
                  <NavLink to={research.to}>{research.label}</NavLink>
                </div>

                {/* Description */}
                <div style={{ ...styles.field, flex: 3 }}>
                  <p style={styles.desc}>{research.description}</p>
                </div>

                {/* Links */}
                <div style={{ ...styles.field, flex: 3, wordWrap: "break-word" }}>
                  <a href={research.links.repo} style={styles.desc}>GitHub</a>
                </div>
                
              </li>
            )
          )}
        </ul>
        
      </div>
    </section>
  );
}
