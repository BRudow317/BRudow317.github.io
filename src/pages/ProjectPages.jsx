
export function ProjectPage({ project }) {
  const styles = {
    Screen: { display: 
      "flex", 
      flexDirection: 
      "column", 
      gap: "14px",
    },
    HeaderText: {
      margin: 0,
      fontSize: "18px",
      letterSpacing: "-0.01em",
    },
  };

  return (
    <section style={styles.Screen} aria-label={`Project: ${project.name}`}>
      <header className="margin: 0;">
        <h2 style={styles.HeaderText}>{project.name}</h2>
        <div className="muted">{project.tagline}</div>
      </header>

      <div className="card">
        <div className="card_title">Overview</div>
        <p className="body">{project.description}</p>

        <div className="split">
          <div>
            <div className="smalltitle">Highlights</div>
            <ul className="list">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>


          <div>
            <div className="smalltitle">Stack</div>
            <div className="chips">
              {project.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>


        <div className="actions">
          {project.links?.repo && (
            <a
              className="btn btn--primary"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Repository
            </a>
          )}

          {project.links?.live && (
            <a
              className="btn"
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
            >
              Live
            </a>
          )}
        </div>

      </div>
    </section>
  );
}
