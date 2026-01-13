// import Packer from "docx/build/file/packer.js";
const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, LevelFormat, BorderStyle, ExternalHyperlink } = require('docx');
const fs = require('fs');

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: "Name",
        name: "Name",
        basedOn: "Normal",
        run: { size: 48, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { after: 60 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 26, color: "444444", font: "Arial" },
        paragraph: { spacing: { after: 100 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Contact",
        name: "Contact",
        basedOn: "Normal",
        run: { size: 20, color: "333333", font: "Arial" },
        paragraph: { spacing: { after: 200 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "SectionHeader",
        name: "Section Header",
        basedOn: "Normal",
        run: { size: 24, bold: true, color: "000000", font: "Arial", allCaps: true },
        paragraph: { 
          spacing: { before: 240, after: 100 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "000000" } }
        }
      },
      {
        id: "JobTitle",
        name: "Job Title",
        basedOn: "Normal",
        run: { size: 23, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 160, after: 40 } }
      },
      {
        id: "CompanyLine",
        name: "Company Line",
        basedOn: "Normal",
        run: { size: 21, italics: true, color: "333333", font: "Arial" },
        paragraph: { spacing: { after: 80 } }
      },
      {
        id: "SummaryText",
        name: "Summary Text",
        basedOn: "Normal",
        run: { size: 22, color: "222222", font: "Arial" },
        paragraph: { spacing: { after: 120 } }
      },
      {
        id: "SkillsText",
        name: "Skills Text",
        basedOn: "Normal",
        run: { size: 21, color: "222222", font: "Arial" },
        paragraph: { spacing: { after: 60 } }
      },
      {
        id: "Education",
        name: "Education",
        basedOn: "Normal",
        run: { size: 21, color: "222222", font: "Arial" },
        paragraph: { spacing: { after: 60 } }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "job-bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: { left: 360, hanging: 360 }
            }
          }
        }]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 720, right: 720, bottom: 720, left: 720 }
      }
    },
    children: [
      // Name
      new Paragraph({
        style: "Name",
        children: [new TextRun("BLAINE RUDOW")]
      }),
      
      // Title - Matching job title keywords
      new Paragraph({
        style: "Title",
        children: [new TextRun("Staff Full Stack Engineer | Product Engineering")]
      }),
      
      // Contact Info
      new Paragraph({
        style: "Contact",
        children: [
          new TextRun("Indianapolis, IN • (217) 521-5468 • blainerudow@gmail.com"),
        ]
      }),
      new Paragraph({
        style: "Contact",
        spacing: { after: 100 },
        children: [
          new ExternalHyperlink({
            children: [new TextRun({ text: "linkedin.com/in/blaine-rudow", color: "0563C1" })],
            link: "https://linkedin.com/in/blaine-rudow"
          }),
          new TextRun(" • "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "github.com/BRudow317", color: "0563C1" })],
            link: "https://github.com/BRudow317"
          })
        ]
      }),

      // Professional Summary
      new Paragraph({
        style: "SectionHeader",
        children: [new TextRun("Professional Summary")]
      }),
      new Paragraph({
        style: "SummaryText",
        children: [new TextRun("Product-focused Full Stack Engineer with 5+ years building and modernizing financial web applications for enterprise systems processing hundreds of millions of dollars annually. Experienced taking ambiguous product ideas from inception to production with full autonomy across the stack. Proven track record in billing systems, API development, cloud infrastructure, and database optimization. Known for balancing engineering best practices with business timelines—delivering scalable, modular solutions without over-engineering.")]
      }),

      // Core Technical Skills
      new Paragraph({
        style: "SectionHeader",
        children: [new TextRun("Core Technical Skills")]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Languages: ", bold: true }),
          new TextRun("Python, JavaScript/TypeScript, Java, SQL, Bash, Go (Golang), Node.js")
        ]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Backend & APIs: ", bold: true }),
          new TextRun("REST API Development, Spring Boot, FastAPI, GRPC, Microservices Architecture, SOLID Principles")
        ]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Frontend: ", bold: true }),
          new TextRun("React (Vite, Tailwind CSS, MUI), HTML5/CSS3, SPA Architecture, UI/UX Design")
        ]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Cloud & Infrastructure: ", bold: true }),
          new TextRun("AWS (EC2, S3, Lambda, RDS, CloudWatch), Terraform, Docker, Linux, CI/CD Pipelines")
        ]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Databases: ", bold: true }),
          new TextRun("PostgreSQL, Oracle, SQL Server, Database Optimization, Query Performance Tuning")
        ]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Data & Messaging: ", bold: true }),
          new TextRun("JMS/Message Queues, Kafka, Airflow, ETL Pipelines, Pub/Sub Patterns, MuleSoft")
        ]
      }),
      new Paragraph({
        style: "SkillsText",
        children: [
          new TextRun({ text: "Tools & Practices: ", bold: true }),
          new TextRun("Git, Jenkins, Jira, Agile/Scrum, OpenAPI/Swagger, JUnit, Dynatrace, ServiceNow")
        ]
      }),

      // Professional Experience
      new Paragraph({
        style: "SectionHeader",
        children: [new TextRun("Professional Experience")]
      }),

      // Job 1 - Senior
      new Paragraph({
        style: "JobTitle",
        children: [new TextRun("Senior Systems Analyst / Full Stack Engineer")]
      }),
      new Paragraph({
        style: "CompanyLine",
        children: [new TextRun("Indiana Public Retirement Systems (INPRS) | Feb 2024 – Present")]
      }),
      new Paragraph({
        style: "SummaryText",
        children: [new TextRun({ text: "Lead engineer for financial enterprise processing $500M+ weekly for 500k+ members. Own product development from concept to production with high autonomy.", italics: true })]
      }),

      // Bullets for Job 1
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Product Development:", bold: true }), new TextRun(" Architected and built internal automation platform (React + Python + Spring Boot + Docker) that reduced manual operations by 50+ hours/week, taking ambiguous requirements to production-ready solutions independently.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Billing & Financial Systems:", bold: true }), new TextRun(" Engineered critical integrations for financial processes handling hundreds of millions of dollars annually, ensuring zero-downtime deployments and fault-tolerant data pipelines.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "API Development:", bold: true }), new TextRun(" Built and maintained REST APIs documented via OpenAPI/Swagger, creating a self-service API registry that reduced cross-team dependencies and accelerated feature delivery.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Database Management:", bold: true }), new TextRun(" Optimized PostgreSQL and Oracle databases for high-volume financial transactions; designed efficient schemas and tuned queries for sub-second response times on complex reporting.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Infrastructure:", bold: true }), new TextRun(" Deployed containerized microservices using Docker, managed cloud resources with infrastructure-as-code practices, and maintained systems with near-zero downtime SLAs.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Message Queues:", bold: true }), new TextRun(" Redesigned brittle batch integrations to asynchronous pub/sub architecture using JMS message queues, reducing integration fault-rate from recurring incidents to zero.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Security & Auth:", bold: true }), new TextRun(" Built central authentication service (CAS) with Okta SSO integration managing session/token validation as single source of truth for enterprise applications.")]
      }),

      // Job 2
      new Paragraph({
        style: "JobTitle",
        children: [new TextRun("Application Developer / Full Stack Engineer")]
      }),
      new Paragraph({
        style: "CompanyLine",
        children: [new TextRun("Indiana Public Retirement Systems (INPRS) | Apr 2022 – Feb 2024")]
      }),
      new Paragraph({
        style: "SummaryText",
        children: [new TextRun({ text: "Core contributor delivering customer-focused software solutions for financial enterprise. Promoted to senior role based on technical ownership and delivery excellence.", italics: true })]
      }),

      // Bullets for Job 2
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Lead Generation & CRM:", bold: true }), new TextRun(" Owned end-to-end data migration and integration development for Salesforce CRM implementation, migrating hundreds of millions of records while maintaining data integrity across complex dependencies.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Frontend Development:", bold: true }), new TextRun(" Led redesign of member-facing web applications using React (Vite, Tailwind CSS, MUI), increasing customer satisfaction scores by 30%+ through improved UX and performance.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "System Integrations:", bold: true }), new TextRun(" Developed enterprise integrations using MuleSoft, REST APIs, and custom Python/Java services connecting disparate financial systems with reliable data orchestration.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Automation & Scripting:", bold: true }), new TextRun(" Built automated workflows and ETL pipelines using Python, Bash, and SQL that eliminated manual processes and ensured consistent data quality across systems.")]
      }),
      new Paragraph({
        numbering: { reference: "job-bullets", level: 0 },
        children: [new TextRun({ text: "Agile Delivery:", bold: true }), new TextRun(" Collaborated across cross-functional teams in Agile environment, consistently delivering high-quality features on schedule while maintaining rigorous code review standards.")]
      }),

      // Education
      new Paragraph({
        style: "SectionHeader",
        children: [new TextRun("Education")]
      }),
      new Paragraph({
        style: "Education",
        children: [
          new TextRun({ text: "B.S., Informatics", bold: true }),
          new TextRun(" (Minor: HCI/UX) | Indiana University Indianapolis | 2020–2022")
        ]
      }),
      new Paragraph({
        style: "Education",
        children: [
          new TextRun({ text: "A.S., Software Development", bold: true }),
          new TextRun(" | Ivy Tech Community College | 2018–2020")
        ]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/Blaine_Rudow_Resume_StaffEngineer.docx", buffer);
  console.log("Resume created successfully!");
});