
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router";

import { WelcomePage } from "./pages/WelcomePage";
import { ResumePage } from "./pages/ResumePage";
import { ProjectPage } from "./pages/ProjectPages";
import { ProjectsViewPage } from "./pages/ProjectsViewPage";
import { YourMoneyLine } from "./pages/YourMoneyLine";
import { InterestCalc } from "./pages/InterestCalc.jsx";
import { Layout } from "./layouts/Layout.jsx";
import { PROJECT_DATA } from "./constants/PROJECT_DATA";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BreakpointProvider } from "./context/BreakpointContext.jsx";
import { DataProvider } from "./context/DataContext.jsx";
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
  const project = PROJECT_DATA.find((p) => p.id === id);

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
            {PROJECT_DATA.map((p) => (
              <li key={p.id}>
                <a href={`/projects/${p.id}`}>{p.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return <ProjectPage project={project} />;
}

export function App() {
  const basename = normalizeBasename(import.meta.env.BASE_URL);

  return (
    <BrowserRouter basename={basename}>
      <BreakpointProvider>
      <DataProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/yourmoneyline" element={<YourMoneyLine />} />
            <Route path="/interestcalc" element={<InterestCalc />} />
            <Route path="/projects" element={<ProjectsViewPage />} />
            <Route path="/projects/:id" element={<ProjectRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ThemeProvider>
      </DataProvider>
      </BreakpointProvider>
    </BrowserRouter>
  );
}
