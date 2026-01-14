import { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import { Intro } from "./components/Shells/Hero/Intro.jsx";
import { Resume } from "./features/Resume/Resume.jsx";
import { Project } from "./features/Project/Project.jsx";
import { projects } from "./constants/projects";
import { Layout2 } from "./layouts/Layout2.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles/ColorTokens.css";
import "./styles/styles.css";

function normalizeBasename(baseUrl) {
  // Vite sets import.meta.env.BASE_URL like "/" or "/repo-name/"
  if (!baseUrl) return "";
  const trimmed = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  return trimmed === "/" ? "" : trimmed;
}

function ProjectRoute() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <section className="screen" aria-label="Not Found">
        <header className="screen_header">
          <h2>Not found</h2>
          <div className="muted">No project matches “{id}”.</div>
        </header>
        <div className="card">
          <div className="card_title">Try</div>
          <ul className="list">
            {projects.map((p) => (
              <li key={p.id}>
                <a href={`/projects/${p.id}`}>{p.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return <Project project={project} />;
}

export function App() {
  const basename = normalizeBasename(import.meta.env.BASE_URL);

  return (
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <Routes>
      <Route path="/" element={<Layout2  />}>
        <Route index element={<Intro />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects/:id" element={<ProjectRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
