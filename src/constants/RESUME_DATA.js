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
  summary: "Product-focused Full Stack Engineer with 5+ years building and modernizing financial web applications for enterprise systems processing hundreds of millions of dollars annually. Experienced taking ambiguous product ideas from inception to production with full autonomy across the stack. Proven track record in billing systems, API development, cloud infrastructure, and database optimization. Known for balancing engineering best practices with business timelines-delivering scalable, modular solutions without over-engineering.",
  skills: [
    { label: "Languages", value: "Python, JavaScript/TypeScript, Java, SQL, Bash, Node.js" },
    { label: "Backend & APIs", value: "RESTful APIs, Spring Boot, FastAPI, Microservice Architecture, Distributed Systems, Flask" },
    { label: "Frontend", value: "React, HTML5/CSS3, SPA Architecture, UI/UX Design" },
    { label: "Cloud & Infrastructure", value: "AWS (EC2, S3, Lambda, RDS, CloudFront, CloudFormation), Terraform, Docker, Linux" },
    { label: "Databases", value: "AWS DynamoDB, PostgreSQL (SQL Alchemy, Supabase), Oracle (Hibernate), NoSQL" },
    { label: "Data & Messaging", value: "JMS/Message Queues, Kafka, Pandas, ETL Pipelines, Pub/Sub Patterns, MuleSoft" },
    { label: "Tools & Practices", value: "Git, Jenkins, Jira, Agile/Scrum, OpenAPI/Swagger, JUnit, Dynatrace, ServiceNow" }
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