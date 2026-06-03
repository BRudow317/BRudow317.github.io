/**
 * @description List of personal data for the portfolio site.
 *
 * @exports RESUME_DATA as an object containing personal information.
 *
 */

export type PersonalSiteLink = {
  id: string;
  website: string;
  url: string;
};

export type EducationItem = {
    id: string;
  degree: string;
  detail: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type ProfessionalSummaryItem = {
  id: string;
  text: string;
};

export type HistoryBullet = {
  label: string;
  text: string;
};

export type ProfessionalHistoryItem = {
  id: string;
  title: string;
  company: string;
  dates: string;
  summary?: string;
  bullets: HistoryBullet[];
};

export type SkillItem = {
  id: string;
  label: string;
  text: string;
};

export type ResumeData = {
  resume: string;
  type: string;
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  title: string;
  sites: PersonalSiteLink[];
  education: EducationItem[];
  certifications: CertificationItem[];
  professional_summary: ProfessionalSummaryItem;
  professional_history: ProfessionalHistoryItem[];
  skills_data: SkillItem[];

};
// , REST APIs, Event Queues & Async Design, Data Integration & Normalization, Threading & Parallelism

export const RESUME_DATA: ResumeData = {
  resume: "resume",
  type: "default",
  id: "software_engineer",
  name: "Blaine Rudow",
  location: "Indianapolis, IN",
  phone: "217-521-5468",
  email: "blainerudow@gmail.com",
  title: "Software Engineer | AWS, TypeScript, Node.js, Python",
  sites: [
    { id: "linkedin", website: "LinkedIn", url: "https://www.linkedin.com/in/blaine-rudow/" },
    { id: "github", website: "GitHub Profile", url: "https://github.com/brudow317" },
    { id: "gitpages", website: "GitHub Portfolio", url: "https://brudow317.github.io/" },
    // { id: "cloud_voyages", website: "Cloud Voyages", url: "https://cloudvoyages.com" }
  ],
  professional_summary: {
    id: "software_engineer_summary",
    text: "Software engineer with 4+ years engineering, improving, and redesigning enterprise software that processes $1B+ annually. Led an enterprise legacy CRM migration that consolidated 5 systems, eliminated a vendor dependency, and saved $1M+ in contract costs. Strong across TypeScript, Node.js, classic & React frontends, AWS, and Python, with deep experience integrating and modernizing legacy applications at every level of the stack. My passion lies in computer science: the sense of accomplishment, creativity, curiosity, problem-solving, and learning from others who are passionate about engineering excellence."
  },
  skills_data: [
    { id: "languages", label: "Programming", text: "TypeScript, JavaScript, Python, SQL, Bash/Shell" },
    { id: "backend", label: "Primary Framework Experience", text: "Node.js, Express, AWS Lambda, React, FastAPI" },
    { id: "web_security", label: "Web", text: "Web/Browser APIs, AWS API Gateway, OpenAPI, Web Application Security Best Practices, REST, SOAP" },
    { id: "infrastructure", label: "Infrastructure", text: "AWS (Lambda, SAM, CloudFront, S3, IAM, VPCs), Linux, Docker, GCP" },
    { id: "data", label: "Data", text: "AWS (DynamoDB, RDS, SNS), Data Modeling & Design, PostgreSQL, Oracle RDBMS, DataFrames, Apache Arrow, ORMs" },
    { id: "devops_tools", label: "DevOps", text: "Terraform, Git (GitHub, GitLab), Jenkins, CI/CD (Actions, Webhooks, Runners), Dynatrace, Rundeck Automation" }
  ],
  professional_history: [
    {
      id: "cloud_voyages",
      title: "Cloud Architect & Engineer",
      company: "Cloud Voyages",
      dates: "Jul 2025 - Present",
      summary: "",
      bullets: [
        {
          label: "Serverless & Lambda Architecture",
          text: "Sole architect and engineer for serverless web applications on AWS for small-business clients using Lambda, DynamoDB, S3, CloudFront, and API Gateway. Successes include optimization and cost reductions by migrating workloads off containerized ECS/RDS to a low-overhead serverless stack to drive down operational cost."
        },
        {
          label: "React & TypeScript Frontend",
          text: "Build responsive React and TypeScript frontends integrated with custom serverless REST APIs and AWS SNS to power real-time lead-generation pipelines, focused on performance, accessibility, and UX across devices."
        },
        {
          label: "Full Lifecycle Delivery",
          text: "Own the full delivery lifecycle: requirements, architecture, CI/CD, and ongoing optimization, with a serverless-first approach to minimize operational overhead on small-business budgets, utilizing the Twelve-Factor App methodology, and AWS best practices."
        }
      ]
    },
    {
      id: "SSA",
      title: "Senior Application Developer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Feb 2024 - Present",
      summary: "",
      bullets: [
        {
          label: "Migration Orchestration (Node.js / TypeScript)",
          text: "Built a dependency-aware API engine in Node.js and TypeScript (Express, Zod, tsx, node-oracledb, apache-arrow, hey-api, OpenAPI) with retries, batching, and concurrency controls; automated 25+ weekly operations and eliminated 50+ hours/week in manual ticket orchestration, monitoring, and discovery. Accomplished by standardizing core automation, manual job runners, and programming logic into a decoupled, centralized service architecture that handles edge cases and data-quality issues dynamically and enables flexible scheduling, monitoring, and alerting across multiple systems such as the automation of opening ServiceNow alert tickets, and SMTP notifications to response teams."
        },
        {
          label: "CRM Cloud Modernization",
          text: "Led a CRM cloud modernization that consolidated 3 department and 2 external CRMs with dependencies across 12+ legacy systems; architected the enterprise data model and migrated 100M+ records in a fixed production cutover with zero business downtime. Built using TypeScript (Zod, tsx, cheerio), Python (Polars, oracledb, FastAPI), Apache Arrow, Parquet, Oracle SQL/PLSQL, Docker, Linux, and AWS EC2."
        },
        {
          label: "Vendor Cost Savings",
          text: "Enabled retirement of the legacy CRM and avoided $1M+ in vendor and contract costs by reaching 99.9%+ day-one data integrity (validated by 3 departments), built on custom parsing and normalization pipelines for 8 non-standard source formats with dynamic handling of edge cases and data-quality issues across hundreds of millions of records. Delivered with TypeScript, Python, Oracle SQL, Docker, EC2, and Linux."
        },
        {
          label: "Documentation Pipeline (Node.js / TypeScript)",
          text: "Built an automated documentation pipeline consolidating 5+ sources into a self-updating SharePoint wiki, cutting onboarding time by 50%+. Designed a decoupled architecture using a PowerShell file watcher service to trigger asynchronous Node.js/TypeScript sync tasks on remote Linux infrastructure. The pipeline uses the available tech stack that solves each problem in the approved ways available in a high-compliance enterprise: PowerShell for file watching service on SharePoint, Node.js/TypeScript for API orchestration, data parsing, and transformation, and on-prem Linux VMs hosting the decoupled compute."
        },
        {
          label: "Event-Driven Architecture",
          text: "Eliminated a 24-hour reporting delay for the Finance department by replacing brittle overnight PL/SQL batch jobs with a near real-time, custom asynchronous queue. Resolved critical database concurrency and table-locking outages by building a decoupled pipeline using staging tables and isolated row-level locking."
        },
        {
          label: "Cross-Team Collaboration",
          text: "Served as sole migration engineer while partnering with the integrations/API team and a 15-person implementation team; drove requirements, de-risked edge cases, managed vendor deliverables, and built internal tooling to orchestrate the complex migrations and processing with Google Cloud Platform, AWS, Oracle, MuleSoft, and Salesforce."
        },
        {
          label: "Platform Engineering",
          text: "Acted as enterprise SME and advocate for Engineering excellence for mission-critical financial systems under strict regulatory compliance, guiding architecture decisions and untangling cross-system dependencies to reduce technical debt and enable a loosely coupled modernization path. Provided technical leadership and mentorship to a team of 5+ developers, fostering a culture of learning, knowledge transfer, code quality, and best practices that improved team performance, morale, time to delivery, and application quality."
        }
      ]
    },
    {
      id: "AppDev",
      title: "Application Developer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Apr 2022 - Feb 2024",
      summary: "",
      bullets: [
        {
          label: "Internal Automation App (FastAPI / React)",
          text: "Built a containerized internal automation app (FastAPI, React, Docker) enabling drag-and-drop Excel processing, automated SQL generation, and one-click loads; cut report turnaround from hours to minutes and grew into a core automation application used across IT. Earned promotion after reverse-engineering and rebuilding core backend logic independently on an accelerated timeline."
        },
        {
          label: "Workflow Automation",
          text: "Automated repetitive data workflows with Python tooling for SQL generation, file loading, and report processing, cutting Excel-to-database turnaround from hours to minutes and freeing 10+ hours/week. Built self-service member data dashboards (Looker/LookML), reducing ticket volume and enabling cross-functional teams to access data without engineering support."
        },
        {
          label: "ETL Pipelines",
          text: "Built production ETL pipelines ingesting 3rd-party vendor sources into the enterprise warehouse as the source of truth; implemented complex eligibility and projection logic in Python to accelerate delivery versus legacy PL/SQL."
        },
        {
          label: "Modeling Applications",
          text: "Owned the upgrades, enhancements, defects, and DevOps lifecycle of multiple web applications, contributing to the adoption of agile methodology that improved collaboration, accelerated delivery, and raised overall application quality."
        },
        {
          label: "Data Validation",
          text: "Partnered with enterprise engineering to implement proactive data validation and monitoring using advanced SQL (CTEs, window functions, cross-database joins), preventing downstream production issues by centralizing the source of truth for calculated data fields."
        }
      ]
    }
  ],
  education: [
    { id: "ms", degree: "M.S., Computer Science, AI, & Machine Learning", detail: " Western Governors University | 2026-2028 (Anticipated)" },
    { id: "bs", degree: "B.S., Informatics & Computing", detail: " Indiana University Indianapolis (IUPUI) | 2020-2022" },
    { id: "as", degree: "A.S., Software Development", detail: " Ivy Tech Community College | 2018-2020" }
  ],
  certifications: [
    { id: "aws", name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Feb 2026" },
    { id: "csd", name: "Certified Scrum Developer", issuer: "Scrum Alliance", date: "Jun 2024" },
    { id: "tableau", name: "Tableau Desktop Specialist", issuer: "Tableau", date: "Dec 2023" },
    { id: "network_automation", name: "Network Automation Professional Certificate by Arista Networks", issuer: "Arista Networks", date: "Mar 2026" },
    { id: "machine_learning", name: "Machine Learning with Python Professional Certificate by Anaconda", issuer: "Anaconda, Inc.", date: "Mar 2026" },
    { id: "hci", name: "Minor & Certificate in HCI/UX", issuer: "Indiana University Indianapolis (IUPUI)", date: "May 2022" }
  ]
};

export const RESUME_LIST: ResumeData[] = [RESUME_DATA];