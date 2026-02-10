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
    name: "Central Lambda Backend Service",
    tagline: "Centralized authentication service for internal applications.",
    description: "A centralized authentication service for managing user access across multiple internal applications.",
    highlights: ["Single sign-on", "OAuth2 support", "User management"],
    stack: ["AWS", "Lambda", "FastAPI", "Python", "DynamoDB", "Auth", "JWT", "Serverless Application Model (SAM)", "AWS CDK", "CloudFormation"],
    links: { repo: "https://github.com/BRudow317/lambdalith",
      live: "https://ol263gec4xofofgmrxq6gc3bv40ljmit.lambda-url.us-east-1.on.aws/docs"
    },
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
    description: "The business website for Cloud Voyages LLC, a cloud consulting company.",
    highlights: ["Marketing", "Distributed System", "Service Catalog", "AWS", "React"],
    stack: ["AWS", "RadixUI", "TypeScript","React","TailwindCSS", "DynamoDB", "Python", "FastAPI", "Docker"],
    links: { 
      repo: "https://github.com/BRudow317/cloudvoyages", 
      live: "https://cloudvoyages.com" 
    },
  },
  {
    id: "Scripts",
    name: "Automation",
    tagline: "My repo for turning manual tasks into automated solutions.",
    description: "A repo for various scripts and automation tools that start as manual tasks, become automations, and eventually services.",
    highlights: ["Automation", "Solution Design", "Compute Optimization", "Scripting"],
    stack: ["Bash", "Python", "Java", "JavaScript", "Docker", "PowerShell", "Oracle RDBMS"],
    links: {
      repo: "https://github.com/BRudow317/Scripts",
    },
  },
  {
    id: "portfolio",
    name: "GitHub Portfolio",
    tagline: "This site, which is a GitHub hosted site for my portfolio of projects.",
    description:
      "You can see various code projects and contributions I've made across different technologies.",
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
