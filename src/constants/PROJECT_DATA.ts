/**
 * @description List of project data for the portfolio site.
 *
 * @exports PROJECT_DATA as an array of project objects.
 *
 */

export type ProjectLinks = {
  repo: string;
  live?: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  links: ProjectLinks;
};

export const PROJECT_DATA: ProjectItem[] = [
  {
    id: "CentralAuthService",
    name: "Central Auth Service",
    tagline: "Centralized authentication service for internal applications.",
    description:
      "A centralized authentication service for managing user access across multiple internal applications.",
    highlights: ["Single sign-on", "OAuth2 support", "User management"],
    stack: ["AWS", "Lambda", "API Gateway", "Cognito", "Python", "DynamoDB"],
    links: { repo: "https://github.com/BRudow317/centralauthservice" },
  },
  {
    id: "Documentation",
    name: "Documentation",
    tagline: "My Tech Documentation.",
    description: "Lots of notes and documentation on various tech topics.",
    highlights: [
      "Architecture",
      "Domain Driven Design",
      "Event Architecture",
      "Microservices",
    ],
    stack: ["Markdown", "Python", "Linux", "React", "JavaScript", "Java", "PostgreSQL"],
    links: { repo: "https://github.com/BRudow317/documentation" },
  },
  {
    id: "CloudVoyages",
    name: "Cloud Voyages",
    tagline: "Marketing website for Cloud Voyages LLC.",
    description:
      "The business website for Cloud Voyages LLC, a cloud consulting company.",
    highlights: ["Marketing", "Distributed System", "Service Catalog", "AWS", "React"],
    stack: ["AWS", "RadixUI", "TypeScript","React","TailwindCSS", "DynamoDB", "Python", "FastAPI", "Docker"],
    links: { repo: "https://github.com/BRudow317/cloudvoyages", live: "https://cloudvoyages.com" },
  },
  {
    id: "Scripts",
    name: "Scripts",
    tagline: "A repo for scripts.",
    description:
      "Repo for various scripts and automation tools that make my life easier.",
    highlights: ["Automation", "Solution Design", "Compute Optimization", "Scripting"],
    stack: ["Bash", "Python", "Java", "JavaScript", "Docker", "PowerShell", "Oracle RDBMS"],
    links: {
      repo: "https://github.com/BRudow317/Scripts",
      live: "https://resume-api.com",
    },
  },
  {
    id: "portfolio",
    name: "GitHub Portfolio",
    tagline: "This site, which is a GitHub hosted site for my portfolio of projects.",
    description:
      "You can see various code .",
    highlights: [
      "Container Services",
      "CI/CD",
      "Full Stack Development",
      "Test Automation",
      "Ubuntu Server Management",
    ],
    stack: ["Python", "FastAPI", "React", "Docker", "Linux", "PostgreSQL"],
    links: {
      repo: "https://github.com/BRudow317/quickbitlabs",
      live: "https://quickbitlabs.com",
    },
  },
  {
    id: "millerlandman",
    name: "Miller Land Management",
    tagline: "Website for Miller Land Management LLC.",
    description:
      "Business site for Miller Land Management LLC in central Indiana.",
    highlights: ["Google API", "AWS Automated Deployments", "SEO Optimization"],
    stack: ["AWS S3", "AWS CloudFront", "Supabase", "React", "JavaScript"],
    links: {
      repo: "https://github.com/BRudow317/mlm",
      live: "https://millerlandman.com",
    },
  },
];
