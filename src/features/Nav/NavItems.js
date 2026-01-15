
import { PROJECT_DATA } from "../../constants/PROJECT_DATA";

export const NavItems = [
  { key: "welcome", label: "Welcome", group: "Top", to: "/" },
  { key: "resume", label: "Resume", group: "Top", to: "/resume" },
  { key: "projectsview", label: "Projects", group: "Projects", to: "/projects" },
  ...PROJECT_DATA.map((p) => ({
    key: p.id,
    label: p.name,
    group: "Projects",
    to: `/projects/${p.id}`,
  })),
];