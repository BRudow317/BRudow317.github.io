/**
 * title: "Application Developer / Full Stack Engineer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Apr 2022 - Feb 2024",
      summary: "",
      bullets:
 */

export const PROFESSIONAL_HISTORY = [
    {
      id: "SSA",
      title: "Senior Systems Analyst (Software Engineer)",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Feb 2024 - Present",
      summary:"",
      bullets: [
        { label: "Migration Impact", 
          text: "Solo-architected and executed enterprise data migration consolidating 8 disparate systems (3 Oracle DBs, vendor APIs, email servers, mainframe) into Salesforce Service Cloud, migrating 10M+ records and eliminating $1M+/year in vendor contracts (CRM + 3rd-party call center). Built custom master data management system with 10K+ lines of integration code (Java, SQL, Python) to normalize inconsistent schemas and deliver terabytes of data in 48-hour production cutover window." 
        },
        { label: "Data Parsing", 
          text: "Engineered custom data parsers for 8 non-standard source formats including pipe-delimited files with embedded delimiters, malformed CSVs without proper escaping, and HTML email content. Built HTML parser from scratch (restrictive plugin environment), implemented image extraction with attachment handling, and designed regex-heavy normalization logic for inconsistent customer data across sources. Achieved 99.9%+ data integrity validated by 3 departments day 1." 
        },
        { label: "Execution Excellence", 
          text: "Delivered zero-downtime migration despite 4-hour vendor delay reducing cutover window to 44 hours (Saturday 4am → Monday 8am). Staged critical data first (open cases via API pagination), then streamed historical data from vendor file drops. Program executed flawlessly on first production run with zero rollback, enabling immediate contract termination of legacy CRM systems." 
        },
        { label: "Autonomous Delivery", 
          text: "Served as sole data migration lead while coordinating with 15-person CRM implementation team. Bridged departmental silos by meeting with directors to define requirements, directed CRM team on data model design, and managed vendor deliverables. Simultaneously contributed to integration team building Salesforce APIs while delivering migration project independently." 
        },
        { label: "Infrastructure:", 
          text: "Built \"Enterprise Resource Dashboard\" with user-centric design for real-time data operations during phone calls. Implemented asynchronous DOM updates via JavaScript to display live job status (loading spinners, retry counts, completion indicators), eliminating need for users to check logs or wait for email notifications. Refactored UI for consistency as platform expanded to 10+ operations maintained by multiple developers." 
        },
        { label: "Migration Platform:", 
          text: "Built self-service data migration platform after Data Governance incorrectly excluded 100K members from Salesforce launch, requiring rapid re-integration. Architected intelligent orchestration system with JMS-based retry logic: exponential backoff (30s→60s→120s), adaptive batch sizing (200→single digits), dependency-aware queuing (parent records before children), and concurrency checks to prevent race conditions. System processed re-integrations in 2 weeks vs 6+ month manual approach, now handles 50+ operations/week saving 50+ hours in ticket orchestration." 
        },
        { label: "Frontend Feature", 
          text: "Transformed rescue tool into \"Enterprise Resource Dashboard\" (ERDB) after CRM product owner rejected self-service feature request. Built in Oracle ADF with Spring Boot backend, enabling case workers to execute real-time data operations (member sync, name changes, account merges) while on phone vs 2-week ticket process. Platform expanded from 1 function to 10+ operations across distributed systems, now core operational tool saving 50+ hours/week in manual orchestration and sprint overhead." 
        },
        { label: "Python Automation",
          text: "Engineered automated knowledge management platform using Python (BeautifulSoup, pandas, CSV parsing) after identifying critical knowledge fragmentation across 5+ sources. Built pipeline converting Markdown/Word/Excel documentation into centralized SharePoint wiki with self-updating ServiceNow integration. Platform maintains 200+ pages covering architecture, configs, SME mapping, and release history-reducing onboarding time 50%+ and enabling rapid feature archeology. Automated regeneration via Python scripts ensures documentation stays current without manual maintenance."
        }
      ]
    },
    {
    id:"Cloud Voyages",
    title: "Cloud Developer",
    company: "Cloud Voyages",
    dates: "July 2025 - Present",
    bullets: [   
      { 
        label: "Cloud Architect",
        text: "Built serverless web applications on AWS for small business clients, architecting cloud-native solutions with S3 (static hosting), CloudFront (CDN), RDS (PostgreSQL), and CloudFormation (infrastructure as code). Designing expansion to include Lambda functions, API Gateway REST APIs, and Cognito authentication for dynamic functionality. Reduced client hosting costs 70% vs traditional providers while improving global performance and scalability.",
    },
    {
        label: "model",
        text: "Implement full development lifecycle: requirements gathering, architecture design, AWS infrastructure provisioning via CloudFormation, CI/CD pipeline setup, and ongoing optimization. Focus on serverless-first architecture to minimize operational overhead and maximize cost efficiency for small business budgets.",
    },
    ],},
    {
      id: "AppDev",
      title: "Application Developer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Apr 2022 - Feb 2024",
      summary: "",
      bullets: [
        { label: "Automation", 
        text: "Automated repetitive data workflows by building Python tools for SQL generation, file loading, and report processing-reducing manual Excel-to-database operations from hours to minutes. Proactively identified team pain points and built self-service dashboards (Looker/LookML) enabling cross-functional teams to access member data without submitting tickets. Automation efforts freed 10+ hours/week for higher-value analysis work." },
        { label: "Promotion Achievement", 
        text: "Built production ETL pipelines integrating 3rd-party vendor sources into enterprise warehouse, becoming source of truth for member data. Independently implemented complex business logic (eligibility calculations, projections) in Python-delivering in weeks what took senior engineers months in PL/SQL. Work led to promotion to Senior Systems Analyst on enterprise engineering team after reverse-engineering and rebuilding core backend logic solo." },
        { label: "React Flask:", 
        text: "Built personal automation platform (Flask backend, React frontend) to eliminate repetitive BI tasks-drag-and-drop Excel file processing, automated SQL generation, and one-click data loading. Containerized application (Docker) reduced report turnaround from hours to minutes, enabling focus on complex analysis over manual data manipulation. Platform became prototype for Enterprise Resource Dashboard after promotion to senior engineer." },
        { label: "Automation & Scripting:", 
        text: "Developed self-service data access interfaces reducing ticket-driven workflows and 2-week wait times for routine business operations. Collaborated with enterprise engineering team to build proactive data monitoring using complex SQL validation (CTEs, window functions, cross-database joins), preventing production incidents. Automation work and cross-functional contributions led to promotion to Senior Systems Analyst after 2 years." },
      ]
    },
];
