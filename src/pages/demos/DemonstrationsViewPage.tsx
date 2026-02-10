import { type CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import { DEMO_DATA } from "../../constants/DEMO_DATA";

const DemoItems = [
  ...DEMO_DATA.map((p) => ({
    key: p.id,
    label: p.name,
    description: p.description,
    links: p.links,
    group: "Demo",
    to: `${p.parent}${p.page}`,
  })),
];

export function DemonstrationsViewPage() {
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

    DemoList: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      margin: 0,
      padding: 0,
      listStyleType: "none",
    },

    DemoRow: {
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
    <section style={styles.Screen} aria-label="Demonstrations Overview">
      <header style={styles.ScreenHeader}>
        <h2 style={styles.ScreenHeader}>Demonstrations Overview</h2>
        <div className="muted">A collection of my work</div>
      </header>

      <div className="card">
        <ul style={styles.DemoList}>
          {DemoItems.filter((demo) => demo.group === "Demo").map(
            (demo, index, arr) => (
              <li
                key={demo.key}
                style={{
                  ...styles.DemoRow,
                  ...(index === arr.length - 1 ? { borderBottom: 'none', marginBottom: 0 } : {})
                }}
              >

                {/* Name */}
                <div style={{ ...styles.field, flex: 2 }}>
                  <NavLink to={demo.to}>{demo.label}</NavLink>
                </div>

                {/* Description */}
                <div style={{ ...styles.field, flex: 3 }}>
                  <p style={styles.desc}>{demo.description}</p>
                </div>

                {/* Links */}
                <div style={{ ...styles.field, flex: 2 }}>
                  <p style={styles.desc}>{demo.links.repo}</p>
                </div>
                
              </li>
            )
          )}
        </ul>
        
      </div>
    </section>
  );
}
