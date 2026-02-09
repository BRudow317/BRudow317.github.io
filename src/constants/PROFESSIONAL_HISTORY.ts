/**
 * title: "Application Developer / Full Stack Engineer",
 *   company: "Indiana Public Retirement Systems (INPRS)",
 *   dates: "Apr 2022 - Feb 2024",
 *   summary: "",
 *   bullets: [
 *     { label: "example",
 *       text: "example"
 *     },
 *   ]
 */

export type HistoryBullet = {
  label: string;
  text: string;
};

export type ProfessionalHistoryItem = {
  id: string;
  type: string;
  title: string;
  company: string;
  dates: string;
  summary?: string;
  bullets: HistoryBullet[];
};

export const PROFESSIONAL_HISTORY: ProfessionalHistoryItem[] = [
  {
    id: "SSA",
    type: "default",
    title: "Software Engineer (Senior Systems Analyst)",
    company: "Indiana Public Retirement Systems (INPRS)",
    dates: "Feb 2024 - Present",
    summary: "",
    bullets: [
      {
        label: "Migration Impact",
        text: "Led a CRM Cloud modernization, consolidating 3 department CRMs, and 2 external CRMs with dependencies across 12+ legacy systems by architecting the enterprise data model, migrating 100M+ records during a fixed production cutover with zero downtime.",
      },
      {
        label: "Data Engineering",
        text: "Enabled retirement of the legacy CRM Achieved, avoiding $1M+ in vendor/contract costs by achieving 99.9%+ day-one data integrity (validated by 3 departments) building custom parsing and normalization pipelines for 8 non-standard source formats.",
      },
      {
        label: "Cross-Team Ownership",
        text: "Served as sole migration engineer while partnering with the integrations/API team and a 15-person implementation team; drove requirements, de-risked edge cases, and managed vendor deliverables to hit launch timelines.",
      },
      {
        label: "Orchestration Platform",
        text: "Built a dependency-aware migration orchestration engine with retries, batching, and concurrency controls; currently automating 25+ weekly operations and saved 50+ hours/week previously spent on manual ticket orchestration alone.",
      },
      {
        label: "High Speed Processing",
        text: "Designed and built event driven architecture for high speed, low latency of thousands of records/hour. Turning batch over night processes into real-time pipelines, bringing data to consumers in finance and investments. Enabling faster operations, audits, insights, and interventions.",
      },
      {
        label: "Python Automation",
        text: "Built a Python documentation pipeline consolidating 5+ sources into a self-updating SharePoint wiki with ServiceNow links (25+ pages), cutting onboarding time 50%+, standardizing processes, and boosting development velocity.",
      },
      {
        label: "Architecture SME",
        text: "Acted as enterprise SME for mission-critical financial systems and strict regulatory compliance, guiding architecture decisions and untangling cross-system dependencies to reduce technical debt and enable a loosely coupled modernization path. This boosts agility, cuts maintenance costs, and passes audits.",
      },
    ],
  },
  {
    id: "Cloud Voyages",
    type: "default",
    title: "Cloud Architect & Founder",
    company: "Cloud Voyages",
    dates: "July 2025 - Present",
    bullets: [
      {
        label: "Cloud Architect",
        text: "Architect of serverless high speed, low cost, web applications on AWS for small business clients, architecting cloud-native solutions with S3 (static hosting), CloudFront (CDN), MariaDB, Lambda, API Gateway, SQS, SNS, and DynamoDB.",
      },
      {
        label: "Frontend Design",
        text: "Design and build responsive React(Next.js, Tanstack) frontends with modern UI/UX principles, focusing on performance optimization, accessibility, and seamless user experiences across devices to enhance customer engagement, market visibility, and generate leads for small business clients.",
      },
      {
        label: "Full Development Lifecycle",
        text: "Implement full development lifecycle: requirements gathering, architecture, design, AWS infrastructure provisioning via SAM, CI/CD pipeline setup and integration with GitHub, and ongoing optimization. Focus on serverless-first architecture to minimize operational overhead and maximize cost efficiency for small business budgets.",
      },
    ],
  },
  {
    id: "AppDev",
    type: "default",
    title: "Application Developer",
    company: "Indiana Public Retirement Systems (INPRS)",
    dates: "Apr 2022 - Feb 2024",
    summary: "",
    bullets: [
      {
        label: "Automation",
        text: "Automated repetitive data workflows by building Python tooling for SQL generation, file loading, and report processing, cutting Excel-to-database turnaround from hours to minutes and freeing 10+ hours/week.",
      },
      {
        label: "Self-Service Analytics",
        text: "Built self-service member data dashboards (Looker/LookML), reducing ticket volume and enabling cross-functional teams to access data without engineering support.",
      },
      {
        label: "ETL + Business Logic",
        text: "Built production ETL pipelines ingesting 3rd-party vendor sources into the enterprise warehouse as the source of truth; implemented complex eligibility and projection logic in Python to accelerate delivery versus legacy PL/SQL.",
      },
      {
        label: "Promotion Achievement",
        text: "Earned promotion to Senior Systems Analyst after reverse-engineering and rebuilding core backend logic independently and delivering critical pipeline and calculation work on an accelerated timeline.",
      },
      {
        label: "Flask + React Platform",
        text: "Built a containerized internal automation app (Flask, React, Docker) enabling drag-and-drop Excel processing, automated SQL generation, and one-click loads; reduced report turnaround from hours to minutes and later informed the Enterprise Resource Dashboard.",
      },
      {
        label: "Data Quality Monitoring",
        text: "Partnered with enterprise engineering to implement proactive data validation and monitoring using advanced SQL (CTEs, window functions, cross-database joins), preventing downstream production issues.",
      },
    ],
  },

  // Frontend Engineer
  {
    id: "SSA",
    type: "frontend_engineer",
    title: "Software Engineer (Senior Systems Analyst)",
    company: "Indiana Public Retirement Systems (INPRS)",
    dates: "Feb 2024 - Present",
    summary: "",
    bullets: [
      {
        label: "Enterprise Dashboard",
        text: "Built the Enterprise Resource Dashboard (React, Spring Boot), a real-time operations platform used daily by case workers; replaced manual workflows, reduced ticket times, and saved 50+ hours/week in operational overhead.",
      },
      {
        label: "UX-Driven Development",
        text: "Leveraged Dynatrace session replay and user behavior analytics (rage clicks, backtracking, time-between-actions) to prioritize UI/UX improvements and inform component design decisions across internal tooling.",
      },
      {
        label: "Migration UI",
        text: "Led Phase 1 of a CRM Cloud modernization, building administrative interfaces for dependency mapping across 12+ legacy systems and orchestrating migration of 100M+ records with zero downtime.",
      },
      {
        label: "Data Integrity",
        text: "Achieved 99.9%+ day-one data integrity (validated by 3 departments) by building custom parsing and normalization pipelines, enabling retirement of the legacy CRM and avoiding $1M+ in vendor costs.",
      },
      {
        label: "API Integration",
        text: "Partnered with the integrations/API team to design and consume RESTful endpoints; drove requirements, documented contracts via OpenAPI/Swagger, and managed vendor deliverables to hit launch timelines.",
      },
      {
        label: "Orchestration Platform",
        text: "Built a dependency-aware migration orchestration engine with retry logic, batching, and concurrency controls; automated 50+ weekly operations previously requiring manual coordination.",
      },
    ],
  },
  {
    id: "Cloud Voyages",
    type: "frontend_engineer",
    title: "Cloud Architect & Founder",
    company: "Cloud Voyages",
    dates: "July 2025 - Present",
    bullets: [
      {
        label: "Cloud Architect",
        text: "Architect of serverless high speed, low cost, web applications on AWS for small business clients, architecting cloud-native solutions with S3 (static hosting), CloudFront (CDN), MariaDB, Lambda, API Gateway, SQS, SNS, and DynamoDB.",
      },
      {
        label: "Frontend Design",
        text: "Design and build responsive React(Next.js, Tanstack, Component Libraries, etc..) frontends with modern UI/UX principles, focusing on performance optimization, accessibility, and seamless user experiences across devices to enhance customer engagement and satisfaction. Currently hosting multiple front end applications for small business clients.",
      },
      {
        label: "Full Development Lifecycle",
        text: "Implement full development lifecycle: requirements gathering, architecture, design, AWS infrastructure provisioning via SAM, CI/CD pipeline setup and integration with GitHub, and ongoing optimization. Focus on serverless-first architecture to minimize operational overhead and maximize cost efficiency for small business budgets.",
      },
    ],
  },
  {
    id: "AppDev",
    type: "frontend_engineer",
    title: "Application Developer",
    company: "Indiana Public Retirement Systems (INPRS)",
    dates: "Apr 2022 - Feb 2024",
    summary: "",
    bullets: [
      {
        label: "Internal Tooling Platform",
        text: "Built a containerized internal automation app (React, Flask, Docker) with drag-and-drop Excel processing, automated SQL generation, and one-click data loads; reduced report turnaround from hours to minutes.",
      },
      {
        label: "Self-Service Dashboards",
        text: "Built self-service member data dashboards (Looker/LookML) with interactive filtering and visualization, reducing ticket volume and enabling cross-functional teams to access data without engineering support.",
      },
      {
        label: "API & Data Integration",
        text: "Built production ETL pipelines and REST API consumers ingesting 3rd-party vendor sources; implemented complex eligibility logic in Python to accelerate delivery versus legacy PL/SQL.",
      },
      {
        label: "Rapid Promotion",
        text: "Earned promotion to Senior Systems Analyst after independently reverse-engineering and rebuilding core backend logic and delivering critical pipeline work on an accelerated timeline.",
      },
      {
        label: "Data Quality",
        text: "Partnered with enterprise engineering to implement proactive data validation using advanced SQL (CTEs, window functions), preventing downstream production issues in user-facing systems.",
      },
    ],
  },
];
