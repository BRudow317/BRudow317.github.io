/**
 * My Resume
 * 
 */

export { Resume };

// export {
//   Resume,
//   resumeData,
//   styles,
//   SectionHeader,
//   ContactInfo,
//   SkillRow,
//   SkillsSection,
//   BulletPoint,
//   JobEntry,
//   ExperienceSection,
//   EducationEntry,
//   EducationSection
// };

const resumeData = {
  name: "BLAINE RUDOW",
  title: "Staff Full Stack Engineer | Product Engineering",
  contact: {
    location: "Indianapolis, IN",
    phone: "(217) 521-5468",
    email: "blainerudow@gmail.com",
    linkedin: { url: "https://linkedin.com/in/blaine-rudow", text: "linkedin.com/in/blaine-rudow" },
    github: { url: "https://github.com/BRudow317", text: "github.com/BRudow317" }
  },
  summary: "Product-focused Full Stack Engineer with 5+ years building and modernizing financial web applications for enterprise systems processing hundreds of millions of dollars annually. Experienced taking ambiguous product ideas from inception to production with full autonomy across the stack. Proven track record in billing systems, API development, cloud infrastructure, and database optimization. Known for balancing engineering best practices with business timelines—delivering scalable, modular solutions without over-engineering.",
  skills: [
    { label: "Languages", value: "Python, JavaScript/TypeScript, Java, SQL, Bash, Go (Golang), Node.js" },
    { label: "Backend & APIs", value: "REST API Development, Spring Boot, FastAPI, GRPC, Microservices Architecture, SOLID Principles" },
    { label: "Frontend", value: "React (Vite, MUI), HTML5/CSS3, SPA Architecture, UI/UX Design" },
    { label: "Cloud & Infrastructure", value: "AWS (EC2, S3, Lambda, RDS, CloudWatch), Terraform, Docker, Linux, CI/CD Pipelines" },
    { label: "Databases", value: "PostgreSQL, Oracle, SQL Server, Database Optimization, Query Performance Tuning" },
    { label: "Data & Messaging", value: "JMS/Message Queues, Kafka, Airflow, ETL Pipelines, Pub/Sub Patterns, MuleSoft" },
    { label: "Tools & Practices", value: "Git, Jenkins, Jira, Agile/Scrum, OpenAPI/Swagger, JUnit, Dynatrace, ServiceNow" }
  ],
  experience: [
    {
      title: "Senior Systems Analyst / Full Stack Engineer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Feb 2024 – Present",
      summary: "Lead engineer for financial enterprise processing $500M+ weekly for 500k+ members. Own product development from concept to production with high autonomy.",
      bullets: [
        { label: "Product Development:", text: " Architected and built internal automation platform (React + Python + Spring Boot + Docker) that reduced manual operations by 50+ hours/week, taking ambiguous requirements to production-ready solutions independently." },
        { label: "Billing & Financial Systems:", text: " Engineered critical integrations for financial processes handling hundreds of millions of dollars annually, ensuring zero-downtime deployments and fault-tolerant data pipelines." },
        { label: "API Development:", text: " Built and maintained REST APIs documented via OpenAPI/Swagger, creating a self-service API registry that reduced cross-team dependencies and accelerated feature delivery." },
        { label: "Database Management:", text: " Optimized PostgreSQL and Oracle databases for high-volume financial transactions; designed efficient schemas and tuned queries for sub-second response times on complex reporting." },
        { label: "Infrastructure:", text: " Deployed containerized microservices using Docker, managed cloud resources with infrastructure-as-code practices, and maintained systems with near-zero downtime SLAs." },
        { label: "Message Queues:", text: " Redesigned brittle batch integrations to asynchronous pub/sub architecture using JMS message queues, reducing integration fault-rate from recurring incidents to zero." },
        { label: "Security & Auth:", text: " Built central authentication service (CAS) with Okta SSO integration managing session/token validation as single source of truth for enterprise applications." }
      ]
    },
    {
      title: "Application Developer / Full Stack Engineer",
      company: "Indiana Public Retirement Systems (INPRS)",
      dates: "Apr 2022 – Feb 2024",
      summary: "Core contributor delivering customer-focused software solutions for financial enterprise. Promoted to senior role based on technical ownership and delivery excellence.",
      bullets: [
        { label: "Lead Generation & CRM:", text: " Owned end-to-end data migration and integration development for Salesforce CRM implementation, migrating hundreds of millions of records while maintaining data integrity across complex dependencies." },
        { label: "Frontend Development:", text: " Led redesign of member-facing web applications using React (Vite, MUI), increasing customer satisfaction scores by 30%+ through improved UX and performance." },
        { label: "System Integrations:", text: " Developed enterprise integrations using MuleSoft, REST APIs, and custom Python/Java services connecting disparate financial systems with reliable data orchestration." },
        { label: "Automation & Scripting:", text: " Built automated workflows and ETL pipelines using Python, Bash, and SQL that eliminated manual processes and ensured consistent data quality across systems." },
        { label: "Agile Delivery:", text: " Collaborated across cross-functional teams in Agile environment, consistently delivering high-quality features on schedule while maintaining rigorous code review standards." }
      ]
    }
  ],
  education: [
    { degree: "B.S., Informatics", detail: " (Minor: HCI/UX) | Indiana University Indianapolis | 2020–2022" },
    { degree: "A.S., Software Development", detail: " | Ivy Tech Community College | 2018–2020" }
  ]
};

// ============================================
// STYLES - Plain CSS-in-JS objects
const styles = {
  // Page container
  page: {
    fontFamily: 'Arial, sans-serif',
    fontSize: '11pt',
    lineHeight: 1.4,
    color: '#222',
    maxWidth: '8.5in',
    margin: '0 auto',
    padding: '0.5in',
    backgroundColor: '#fff'
  },

  // Header styles
  name: {
    fontSize: '24pt',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: '5px'
  },
  title: {
    fontSize: '13pt',
    textAlign: 'center',
    color: '#444',
    marginBottom: '8px'
  },
  contactLine: {
    fontSize: '10pt',
    textAlign: 'center',
    color: '#333',
    marginBottom: '5px'
  },
  link: {
    color: '#0563C1',
    textDecoration: 'none'
  },

  // Section styles
  sectionHeader: {
    fontSize: '12pt',
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'uppercase',
    borderBottom: '2px solid #000',
    paddingBottom: '3px',
    marginTop: '16px',
    marginBottom: '8px'
  },

  // Content styles
  paragraph: {
    fontSize: '11pt',
    color: '#222',
    marginBottom: '8px'
  },
  paragraphItalic: {
    fontSize: '11pt',
    color: '#222',
    marginBottom: '6px',
    fontStyle: 'italic'
  },
  skillRow: {
    fontSize: '10.5pt',
    color: '#222',
    marginBottom: '4px'
  },

  // Job styles
  jobTitle: {
    fontSize: '11.5pt',
    fontWeight: 'bold',
    color: '#000',
    marginTop: '12px',
    marginBottom: '3px'
  },
  companyLine: {
    fontSize: '10.5pt',
    fontStyle: 'italic',
    color: '#333',
    marginBottom: '5px'
  },

  // List styles
  bulletList: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    marginTop: '0',
    marginBottom: '5px'
  },
  bulletItem: {
    fontSize: '10.5pt',
    color: '#222',
    marginBottom: '4px'
  },

  // Education
  educationItem: {
    fontSize: '10.5pt',
    color: '#222',
    marginBottom: '4px'
  }
};

// ============================================
// REUSABLE COMPONENTS

const SectionHeader = ({ children }) => (
  <div style={styles.sectionHeader}>{children}</div>
);

const ContactInfo = ({ contact }) => (
  <>
    <div style={styles.contactLine}>
      {contact.location} • {contact.phone} • {contact.email}
    </div>
    <div style={styles.contactLine}>
      <a href={contact.linkedin.url} style={styles.link}>{contact.linkedin.text}</a>
      {" • "}
      <a href={contact.github.url} style={styles.link}>{contact.github.text}</a>
    </div>
  </>
);

const SkillRow = ({ label, value }) => (
  <div style={styles.skillRow}>
    <strong>{label}:</strong> {value}
  </div>
);

const SkillsSection = ({ skills }) => (
  <>
    <SectionHeader>Core Technical Skills</SectionHeader>
    {skills.map((skill, idx) => (
      <SkillRow key={idx} label={skill.label} value={skill.value} />
    ))}
  </>
);

const BulletPoint = ({ label, text }) => (
  <li style={styles.bulletItem}>
    <strong>{label}</strong>{text}
  </li>
);

const JobEntry = ({ job }) => (
  <div>
    <div style={styles.jobTitle}>{job.title}</div>
    <div style={styles.companyLine}>{job.company} | {job.dates}</div>
    <div style={styles.paragraphItalic}>{job.summary}</div>
    <ul style={styles.bulletList}>
      {job.bullets.map((bullet, idx) => (
        <BulletPoint key={idx} label={bullet.label} text={bullet.text} />
      ))}
    </ul>
  </div>
);

const ExperienceSection = ({ experience }) => (
  <>
    <SectionHeader>Professional Experience</SectionHeader>
    {experience.map((job, idx) => (
      <JobEntry key={idx} job={job} />
    ))}
  </>
);

const EducationEntry = ({ degree, detail }) => (
  <div style={styles.educationItem}>
    <strong>{degree}</strong>{detail}
  </div>
);

const EducationSection = ({ education }) => (
  <>
    <SectionHeader>Education</SectionHeader>
    {education.map((edu, idx) => (
      <EducationEntry key={idx} degree={edu.degree} detail={edu.detail} />
    ))}
  </>
);

// ============================================
// MAIN RESUME COMPONENT

const Resume = ({ data = resumeData }) => {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.name}>{data.name}</div>
      <div style={styles.title}>{data.title}</div>
      <ContactInfo contact={data.contact} />

      {/* Summary */}
      <SectionHeader>Professional Summary</SectionHeader>
      <div style={styles.paragraph}>{data.summary}</div>

      {/* Skills */}
      <SkillsSection skills={data.skills} />

      {/* Experience */}
      <ExperienceSection experience={data.experience} />

      {/* Education */}
      <EducationSection education={data.education} />
    </div>
  );
};