/**
 * @description List of demo data for the portfolio site.
 *
 * @exports DEMO_DATA as an array of demo objects.
 *
 */


export type ResearchLinks = {
  repo: string;
  live?: string;
};

export type ResearchItem = {
  id: string;
  name: string;
  description: string;
  links: ResearchLinks;
  group: "Research";
  parent: "/research";
  page: string;
};
 
export const RESEARCH_DATA: ResearchItem[] = [
  {
    id: "CompensationAnalysis",
    name: "Compensation Analysis",
    description: "Compensation analysis tool to evaluate and optimize employee compensation.",
    links: { repo: "https://github.com/BRudow317/" },
    group: "Research",
    parent: "/research",
    page: "/compensation",
  },
  {
    id: "MxIntegration",
    name: "Mx Integration",
    description: "Conducted Research on MX Integrations and application architecture ideas.",
    links: { repo: "https://github.com/BRudow317/" },
    group: "Research",
    parent: "/research",
    page: "/mx",
  },
];