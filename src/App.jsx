
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
import { DemonstrationsViewPage } from "./pages/demos/DemonstrationsViewPage";
import { ResearchViewPage } from "./pages/research/ResearchViewPage";
import { MxIntegration } from "./pages/research/MxIntegration";
import { YourMoneyLine } from "./pages/research/YourMoneyLine";
import { InterestCalc } from "./pages/demos/InterestCalc";
import { Layout } from "./layouts/Layout";
import { PROJECT_DATA } from "./constants/PROJECT_DATA";
import { DEMO_DATA } from "./constants/DEMO_DATA";
import { RESEARCH_DATA } from "./constants/RESEARCH_DATA";
import { ThemeProvider } from "./context/ThemeContext";
import { BreakpointProvider } from "./context/BreakpointContext";
import { DataProvider } from "./context/DataContext";
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

const demoComponentMap = {
  InterestCalc,
};

const researchComponentMap = {
  MxIntegration,
  YourMoneyLine,
};

function normalizeRoutePath(parent, page) {
  const normalizedParent = parent.startsWith("/") ? parent : `/${parent}`;
  return `${normalizedParent}${page}`;
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
            <Route path="/research" element={<ResearchViewPage />} />
            {RESEARCH_DATA.map((item) => {
              const Component = researchComponentMap[item.id];
              if (!Component) return null;
              return (
                <Route
                  key={item.id}
                  path={normalizeRoutePath(item.parent, item.page)}
                  element={<Component />}
                />
              );
            })}
            
            <Route path="/demo" element={<DemonstrationsViewPage />} />
            {DEMO_DATA.map((item) => {
              const Component = demoComponentMap[item.id];
              if (!Component) return null;
              return (
                <Route
                  key={item.id}
                  path={normalizeRoutePath(item.parent, item.page)}
                  element={<Component />}
                />
              );
            })}

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
