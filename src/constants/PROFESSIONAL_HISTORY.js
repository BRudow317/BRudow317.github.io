/**
 * title: "Application Developer / Full Stack Engineer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Apr 2022 - Feb 2024",
      summary: "",
      bullets: [
        { label: "example",
          text: "example"
        },
      ]
 */

export const PROFESSIONAL_HISTORY = [
  {
    id: "SSA",
    title: "Senior Systems Analyst (Software Engineer)",
    company: "Indiana Public Retirement Systems (INPRS)",
    dates: "Feb 2024 - Present",
    summary: "",
    bullets: [
      {
        label: "Migration Impact",
        text: "Led Phase 1 of a CRM Cloud modernization, mapping dependencies across 12+ legacy systems and migrating 100M+ records during a fixed production cutover with zero downtime.",
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
        text: "Built a dependency-aware migration orchestration engine with retries, batching, and concurrency controls; automated 50+ weekly operations and saved 50+ hours/week previously spent on manual ticket orchestration.",
      },
      {
        label: "Operational Tooling",
        text: "Reduced manual orchestrations and lengthy ticket times, saving 50+ hours/week through a processing dashboard used by case workers for real-time operations, replacing manual workflows and reducing operational handoffs.",
      },
      {
        label: "Python Automation",
        text: "Built a Python documentation pipeline (BeautifulSoup, pandas) consolidating 5+ sources into a self-updating SharePoint wiki with ServiceNow links (25+ pages), cutting onboarding time 50%+, standardizing processes, and boosting development velocity.",
      },
      {
        label: "Architecture SME",
        text: "Acted as enterprise SME for mission-critical financial systems and strict regulatory compliance, guiding architecture decisions and untangling cross-system dependencies to reduce technical debt and enable a loosely coupled modernization path.",
      },
    ],

    /* bullets: [
        { label: "Migration Impact", 
          text: "Architected and delivered Phase 1 of a Salesforce Service Cloud migration, mapping dependencies across 12+ non-normalized systems and migrating 100M+ records under a fixed production cutover window with zero downtime." 
        },
        { label: "Data Parsing", 
          text: "Achieved 99.9%+ data integrity validated by 3 departments day 1 through data engineering with custom data parsers for 8 non-standard source formats. Built HTML parser from scratch (restrictive plugin environment), implemented image extraction with attachment handling, and regex-heavy normalization logic for inconsistent customer data." 
        },
        { label: "example",
          text: "example"
        },
        { label: "Autonomous Delivery", 
          text: "Served as sole data migration engineer while simultaneously contributing to api and integrations team, coordinating with 15-person CRM implementation team. Bridged departmental silos by meeting with organization leaders to define requirements, directed CRM team on data model design, dependencies, edge cases and managed vendor deliverables." 
        },
        { label: "Migration Platform:", 
          text: "Architected intelligent orchestration system with JMS-based retry logic: exponential backoff (30s->60s->120s), adaptive batch sizing (200->single digits), dependency-aware queuing (parent records before children), and concurrency checks to prevent race conditions. System now handles 50+ operations/week saving 50+ hours in ticket orchestration and user friction from manual processes." 
        },
        { label: "Frontend Feature", 
          text: "Transformed rescue tool into \"Enterprise Resource Dashboard\" (ERDB). Built in Oracle ADF with Spring Boot backend, enabling case workers to execute real-time data operations, which is now a core operational tool saving 50+ hours/week in manual orchestration and sprint overhead." 
        },
        { label: "Python Automation",
          text: "Engineered automated knowledge management platform using Python (BeautifulSoup, pandas, CSV parsing) after identifying critical knowledge fragmentation across 5+ sources. Built pipeline converting Markdown/Word/Excel documentation into centralized SharePoint wiki with self-updating ServiceNow integration. Platform maintains 200+ pages covering architecture, configs, SME mapping, and release history-reducing onboarding time 50%+ and enabling rapid feature archeology. Automated regeneration via Python scripts ensures documentation stays current without manual maintenance."
        },
        {
          label: "Soft Skill",
          text: "Led as a force multiplier by taking on the most complex and high-impact tasks, enabling teams to meet aggressive deadlines. Recognized by leadership for proactive problem-solving, cross-team collaboration, and ability to deliver under pressure, contributing to overall project success and team efficiency."
        },
        {
          label: "Architecture",
          text: "Prioritized as a subject matter expert on the most important financial and mission critical systems, contributing critical knowledge that accelerates system implementation, correction, and development. Led architecture discussions and provided guidance on architecture, acted as the go-to enterprise SME for mission-critical financial platforms, untangling legacy dependencies across systems and aligning teams on a modernization path toward loosely coupled, scalable architecture. Development, and system analysis, and how to bridge architectural legacy complexities, dependencies, and technical debt with modern solutions and best practices."
        }
      ] */
  },
  {
    id: "Cloud Voyages",
    title: "Cloud Architect & Founder",
    company: "Cloud Voyages",
    dates: "July 2025 - Present",
    bullets: [
      {
        label: "Cloud Architect",
        text: "Architect of serverless high speed, low cost, web applications on AWS for small business clients, architecting cloud-native solutions with S3 (static hosting), CloudFront (CDN), MariaDB, Lambda, API Gateway, DynamoDB orchestrated with SAM IaC (infrastructure as code).",
      },
      {
        label: "model",
        text: "Implement full development lifecycle: requirements gathering, architecture design, AWS infrastructure provisioning via SAM, CI/CD pipeline setup and integration with GitHub, and ongoing optimization. Focus on serverless-first architecture to minimize operational overhead and maximize cost efficiency for small business budgets.",
      },
    ],
  },
  {
    id: "AppDev",
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

    /* bullets: [
      {
        label: "Automation",
        text: "Automated repetitive data workflows by building Python tools for SQL generation, file loading, and report processing-reducing manual Excel-to-database operations from hours to minutes. Proactively identified team pain points and built self-service dashboards (Looker/LookML) enabling cross-functional teams to access member data without submitting tickets. Automation efforts freed 10+ hours/week for higher-value analysis work.",
      },
      {
        label: "Promotion Achievement",
        text: "Built production ETL pipelines integrating 3rd-party vendor sources into enterprise warehouse, becoming source of truth for member data. Independently implemented complex business logic (eligibility calculations, projections) in Python-delivering in weeks what took senior engineers months in PL/SQL. Work led to promotion to Senior Systems Analyst on enterprise engineering team after reverse-engineering and rebuilding core backend logic solo.",
      },
      {
        label: "React Flask:",
        text: "Built personal automation platform (Flask backend, React frontend) to eliminate repetitive BI tasks-drag-and-drop Excel file processing, automated SQL generation, and one-click data loading. Containerized application (Docker) reduced report turnaround from hours to minutes, enabling focus on complex analysis over manual data manipulation. Platform became prototype for Enterprise Resource Dashboard after promotion to senior engineer.",
      },
      {
        label: "Automation & Scripting:",
        text: "Developed self-service data access interfaces reducing ticket-driven workflows and 2-week wait times for routine business operations. Collaborated with enterprise engineering team to build proactive data monitoring using complex SQL validation (CTEs, window functions, cross-database joins), preventing production incidents. Automation work and cross-functional contributions led to promotion to Senior Systems Analyst after 2 years.",
      },
    ],
    */
  },
];
