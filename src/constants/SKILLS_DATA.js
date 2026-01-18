/**
 * This file contains the skills section of the resume.
 * 
In this chat:
PRIMARY_GOAL: Optimize my skills section so that ATS and LLM systems can read it and prioritize me for software engineering roles.

SECONDARY_GOAL: The hiring engineer understandS what I've worked with, but also I don't list things that make me look inexperienced or unqualified. I've found that listing too many tools makes you look like a junior dev who just copies and pastes from tutorials. But listing too few makes you look like you don't have the experience they need.

TERTIARY_GOAL: The recruiter can quickly scan to ensure I match skills, So I need to limit each group to one line, and probably limit the number of groups. they probably don't understand well. For example, they might be looking for terraform, kafka, or kubernetes experience, but I have Docker Compose, JMS, and IaC experience with CloudFormation. 

 * 
 */

export const SKILLS_DATA = [
  { 
    label: "Languages",
    value: "Java, Python, SQL, JavaScript, TypeScript, Bash, PL/SQL" 
  },
  { 
    label: "Backend",
    value: "Spring Boot, FastAPI, Flask, AWS Lambda, SQL Alchemy, Pandas, NumPy, Hibernate (JPA)" 
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
        label: "Testing", 
        value: "JUnit, Mockito, PyTest, Vitest, Selenium"
    },
  { 
    label: "Tools & DevOps",
    value: "Git (GitHub, GitLab), Linux, Docker (Compose), Vite, Maven, Gradle, Jenkins CI/CD, Dynatrace, Rundeck, Agile" 
  }
];
