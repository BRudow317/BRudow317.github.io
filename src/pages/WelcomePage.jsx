import React from "react";
import { Link } from "react-router-dom";

export function WelcomePage() {
  var styles={
    Screen: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    },

    ScreenHeader: {
      margin: 0,
      fontSize: '18px',
      letterSpacing: '-0.01em',
    },

    Hero: {
      padding: '18px',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius)',
      backgroundColor: 'var(--bg-2)',
      boxShadow: 'var(--box-shadow-1)',
    },

    HeroTitle: {
      margin: 0,
      fontSize: '26px',
      letterSpacing: '-0.02em',
    },

    HeroSubtitle: {
      margin: '6px 0 0 0',
    },

    HeroSummary: {
      margin: '12px 0 0 0',
      lineHeight: 1.6,
      maxWidth: '70ch',
      color: 'var(--text-2)',
    },

    HeroActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '14px',
      flexWrap: 'wrap',
    },

    HeroMeta: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginTop: '14px',
    },
  }


  return (
    <section style={styles.Screen} aria-label="Welcome">
      <div style={styles.Hero}>
        <h1 style={styles.HeroTitle}>Blaine Rudow</h1>
        <p style={styles.HeroSubtitle}>Full Stack Engineer • Web Designer</p>

        <p style={styles.HeroSummary}>
          Product-focused Full Stack Engineer with 5+ years building and 
          modernizing financial web applications for enterprise 
          systems processing hundreds of millions of dollars annually. 
          Experienced taking ambiguous product ideas from inception to 
          production with full autonomy across the stack. Proven track 
          record in billing systems, API development, cloud infrastructure, 
          and database optimization. Known for balancing engineering best 
          practices with business timelines-delivering scalable, 
          modular solutions without over-engineering.
        </p>

        <div style={styles.HeroActions}>
          <Link className="btn btn-primary" to="/resume">View resume</Link>
          <Link className="btn" to="/projects/quickbitlabs">View projects</Link>
        </div>

        <div style={styles.HeroMeta}>
          <span className="pill">Indianapolis, IN</span>
          {/* <span className="pill">Open to: Remote/Hybrid</span> */}
          <span className="pill">Infrastructure: AWS | Enterprise | Distributed Systems | Cloud | Linux</span>
          <span className="pill">Frontend: Web Design | Optimization | SEO</span>
          <span className="pill">Backend: Security | Business Domain | Computing Optimization</span>
          <span className="pill">Integrations: REST | GraphQL | Messaging | Queues</span>
          
        </div>
      </div>

      <div className="card">
        <div className="card_title">Core Technical Skills</div>
        <ul className="list">
          <li>Languages: Python, JavaScript/TypeScript, Java, SQL, Bash, Node.js</li>
          <li>Backend & APIs: RESTful APIs, Spring Boot, FastAPI, Microservice Architecture, Distributed Systems, Flask</li>
          <li>Frontend: React, HTML5/CSS3, SPA Architecture, UI/UX Design</li>
          <li>Cloud & Infrastructure: AWS (EC2, S3, Lambda, RDS, CloudFront, CloudFormation), Terraform, Docker, Linux</li>
          <li>Databases: AWS DynamoDB, PostgreSQL (SQL Alchemy, Supabase), Oracle (Hibernate), NoSQL, Query Performance Tuning</li>
          <li>Data & Messaging: JMS/Message Queues, Kafka, Pandas, ETL Pipelines, Pub/Sub Patterns, MuleSoft</li>
          <li>Tools & Practices: Git, Jenkins, Jira, Agile/Scrum, OpenAPI/Swagger, JUnit, Dynatrace, ServiceNow</li>
        </ul>
      </div>
    </section>
  );
}
