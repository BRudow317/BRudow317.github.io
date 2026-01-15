/**
 * My Resume
 * 
 */

// export { Resume };
import { resumeData } from '../../constants/RESUME_DATA.js';
export { Resume };

// Off for linting
// export {
//   Resume,
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

const styles = {
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
  skillText:{
    margin: 0,
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


const SectionHeader = ({ children, style = styles.sectionHeader }) => (
  <div style={style}>{children}</div>
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
    <p style={styles.skillText}>
      <label id={label}><strong>{label}: </strong></label>
      {value}
    </p>
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

// Main Resume

const Resume = ({ data = resumeData }) => {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.name}>{data.name}</div>
      <div style={styles.title}>{data.title}</div>
      <ContactInfo contact={data.contact} />

      {/* Summary */}
      <SectionHeader style={styles.sectionHeader} >Professional Summary</SectionHeader>
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