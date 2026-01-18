export const RESUME_DATA = {
  name: "Blaine Rudow",
  title: "Full Stack Engineer | Web Design",
  contact: {
    location: "Indianapolis, IN",
    phone: "(217) 521-5468",
    email: "blainerudow@gmail.com",
    linkedin: { url: "https://linkedin.com/in/blaine-rudow", text: "linkedin.com/in/blaine-rudow" },
    github: { url: "https://github.com/BRudow317", text: "github.com/BRudow317" }
  },
  summary: "Software Engineer with 4+ years of experience building and deploying distributed systems processing $1B+ annually. Saved $1M+ in vendor contracts by architecting and implementing a cloud migration and integration that eliminated our legacy CRM dependency. Expert at delivering full-stack solutions and applications autonomously with primary experience in: AWS, JavaScript & TypeScript, Python, Java, and SQL.",
  skills: [
    { 
    label: "Languages",
    value: "Java, Python, SQL, JavaScript, TypeScript, Bash, PL/SQL" 
  },
  { 
    label: "Backend",
    value: "Spring Boot, FastAPI, Flask, AWS Lambda, SQL Alchemy, JUnit, Mockito, Hibernate (JPA)" 
  },
  { 
    label: "Frontend & APIs",
    value: "React, AWS API Gateway, AWS CloudFront, Responsive Design, RESTful APIs, OpenAPI/Swagger" 
  },
  { 
    label: "Data & Persistence",
    value: "PostgreSQL, Oracle, AWS DynamoDB, AWS S3,  AWS RDS, Data Model Design" 
  },
  { 
    label: "Integrations",
    value: "JMS, Event-Driven Architecture, Scripting, Batch Processing, ETL Pipelines"
  },
    { 
        label: "Security", 
        value: "AWS Cognito, AWS VPC, AWS IAM, OAuth2.0, OIDC, JWT"
    },
  { 
    label: "Tools & DevOps",
    value: "Git (GitHub, GitLab, Bitbucket), Linux, Docker (Compose), Vite, Maven, Gradle, Jenkins CI/CD, Dynatrace, Rundeck, Agile" 
  }
  ],
  experience: [
    {
      title: "Senior Systems Analyst (Full Stack Engineer)",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Feb 2024 - Present",
      summary:"",
      bullets: [
        { label: "Product Development:", 
          text: "Architected and built internal automation platform (React + Python + Spring Boot + Docker) that reduced manual operations by 50+ hours/week, taking ambiguous requirements to production-ready solutions independently." },
        { label: "Billing & Financial Systems:", 
          text: "Engineered critical integrations for financial processes handling hundreds of millions of dollars annually, ensuring zero-downtime deployments and fault-tolerant data pipelines." },
        { label: "API Development:", 
          text: "Built and maintained REST APIs documented via OpenAPI/Swagger, creating a self-service API registry that reduced cross-team dependencies and accelerated feature delivery." },
        { label: "Database Management:", 
          text: "Optimized PostgreSQL and Oracle databases for high-volume financial transactions; designed efficient schemas and tuned queries for sub-second response times on complex reporting." },
        { label: "Infrastructure:", 
          text: "Deployed containerized microservices using Docker, managed cloud resources with infrastructure-as-code practices, and maintained systems with near-zero downtime SLAs." },
        { label: "Message Queues:", 
          text: "Redesigned brittle batch integrations to asynchronous pub/sub architecture using JMS message queues, reducing integration fault-rate from recurring incidents to zero." },
        { label: "Security & Auth:", 
          text: "Built central authentication service (CAS) with Okta SSO integration managing session/token validation as single source of truth for enterprise applications." }
      ]
    },
    {
      title: "Application Developer / Full Stack Engineer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Apr 2022 - Feb 2024",
      summary: "",
      bullets: [
        { label: "Lead Generation & CRM:", 
        text: "Owned end-to-end data migration and integration development for Salesforce CRM implementation, migrating hundreds of millions of records while maintaining data integrity across complex dependencies." },
        { label: "Frontend Development:", 
        text: "Design and build of member-facing web applications, increasing customer satisfaction scores by 30%+ through improved UX and performance." },
        { label: "System Integrations:", 
        text: "Developed enterprise integrations using MuleSoft, REST APIs, and Java services connecting disparate financial systems with reliable data orchestration." },
        { label: "Automation & Scripting:", 
        text: "Built automated workflows and ETL pipelines using Python, Bash, and SQL that eliminated manual processes and ensured consistent data quality across systems." },
        { label: "Agile Delivery:", text: "Collaborated across cross-functional teams in Agile environment, consistently delivering high-quality features on schedule while maintaining rigorous code review standards." }
      ]
    }
  ],
  education: [
    { degree: "B.S., Informatics & Computing", detail: " (Minor: HCI/UX) | Indiana University Indianapolis | 2020-2022" },
    { degree: "A.S., Software Development", detail: " | Ivy Tech Community College | 2018-2020" }
  ]
};