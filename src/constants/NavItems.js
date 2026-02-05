
import { PROJECT_DATA } from "./PROJECT_DATA";

export const NavItems = [
  { key: "welcome", label: "Welcome", group: "Top", to: "/" },
  { key: "resume", label: "Resume", group: "Top", to: "/resume" },
  { key: "yourmoneyline", label: "Your Money Line", group: "Top", to: "/yourmoneyline" },
  { key: "interestcalc", label: "Interest Calculator", group: "Top", to: "/interestcalc" },
  { key: "projectsview", label: "Projects", group: "Projects", to: "/projects" },
  ...PROJECT_DATA.map((p) => ({
    key: p.id,
    label: p.name,
    group: "Projects",
    to: `/projects/${p.id}`,
  })),
];