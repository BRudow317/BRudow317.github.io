
import { PROJECT_DATA, type ProjectItem } from "./PROJECT_DATA";

export type NavItem = {
  key: string;
  label: string;
  group: "Top" | "Projects";
  to: string;
};

const projectNavItems = (PROJECT_DATA as ProjectItem[]).map((project) => ({
  key: project.id,
  label: project.name,
  group: "Projects" as const,
  to: `/projects/${project.id}`,
}));

export const NavItems: NavItem[] = [
  { key: "welcome", label: "Welcome", group: "Top", to: "/" },
  { key: "resume", label: "Resume", group: "Top", to: "/resume" },
  { key: "yourmoneyline", label: "Your Money Line", group: "Top", to: "/yourmoneyline" },
  { key: "interestcalc", label: "Interest Calculator", group: "Top", to: "/interestcalc" },
  { key: "projectsview", label: "Projects", group: "Projects", to: "/projects" },
  ...projectNavItems,
];