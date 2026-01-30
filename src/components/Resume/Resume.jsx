/**
 * My Resume
 * 
 * 
 * Array access notes:
 * // Get a single item by id
const languagesSkill = 
  SKILLS_DATA.find(skill => skill.id === 'languages');

// In JSX, use the id as the key prop
{skills.map((skill) => (
  <SkillRow key={skill.id} label={skill.label} value={skill.value} />
))}
 */
import { PERSONAL_DATA } from '../../constants/PERSONAL_DATA';
import { SKILLS_DATA } from '../../constants/SKILLS_DATA';
import { PROFESSIONAL_SUMMARY } from '../../constants/PROFESSIONAL_SUMMARY';
import { PROFESSIONAL_HISTORY } from '../../constants/PROFESSIONAL_HISTORY';
// import { SITE_CONTEXT } from '../../constants/SITE_CONTEXT';
import { useData } from '../../context/DataContext';

// Helper to filter data arrays by context type with fallback to "default"
const filterByContext = (dataArray, contextId) => {
  const contextItems = dataArray.filter((item) => item.type === contextId);
  return contextItems.length > 0
    ? contextItems
    : dataArray.filter((item) => item.type === "default");
};

export const Resume = (
  {
    persData = PERSONAL_DATA,
    // profSum = PROFESSIONAL_SUMMARY.find(summary => summary.id === "primary").text,
    // skillsData = SKILLS_DATA,
    // profHistory = PROFESSIONAL_HISTORY,
    eduData = PERSONAL_DATA.education,
    certData = PERSONAL_DATA.certifications,
    styles = {
      page: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '11pt',
        lineHeight: 1.4,
        color: '#222',
        maxWidth: '8.5in',
        margin: '0 auto',
        padding: '0.5in',
        backgroundColor: '#fff',
        overflowWrap: 'anywhere'
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
        marginBottom: '5px',
        overflowWrap: 'anywhere'
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
    }
  } = {}) =>
{
  // Get the current data context
  const { dataContext } = useData();

  // Filter data based on context (falls back to "default" if no match)
  const skillsData = filterByContext(SKILLS_DATA, dataContext);
  const profHistory = filterByContext(PROFESSIONAL_HISTORY, dataContext);
  const profSumObj = PROFESSIONAL_SUMMARY.find((s) => s.id === dataContext)
    || PROFESSIONAL_SUMMARY.find((s) => s.id === "default")
    || PROFESSIONAL_SUMMARY[0];
  const profSum = profSumObj.text;

  // Get title from professional summary, fallback to PERSONAL_DATA.title
  const title = profSumObj.title || PERSONAL_DATA.title;

  const SectionHeader = (
    { children = {}, 
      style = styles.sectionHeader 
    } = {}) => (
    <h3 style={style}>{children}</h3>
  );

  const ContactInfo = ({ contact }) => {
    return (
    <>
      <p style={styles.contactLine}>
        {contact.location} • {contact.phone} • {contact.email}
      </p>
      <p style={styles.contactLine}>
        {contact.sites.map(
          site => (
            <a href={site.url} 
              style={styles.link} 
              key={site.id}>{site.website}
            </a>)
          ).reduce(
            (prev, curr) => [prev, " • ", curr]
          )
        }
      </p>
    </>
  );
  };

  const SkillRow = ({ label, text }) => (
    <span style={styles.skillRow}>
      <p style={styles.skillText}>
        <label id={label} style={{fontWeight: 'bold'}}>{label}: </label>
        {text}
      </p>
    </span>
  );

  const SkillsSection = ({ skills }) => (
    <section id="SkillsSection">
      <SectionHeader>Core Technical Skills</SectionHeader>
      {skills.map((skill, idx) => (
        <SkillRow key={idx} label={skill.label} text={skill.text} />
      ))}
    </section>
  );

  const BulletPoint = ({ label, text }) => (
    <li style={styles.bulletItem}>
      {label}{text}
    </li>
  );

  const JobEntry = ({ job }) => (
    <span>
      <h4 style={styles.jobTitle}>{job.title}</h4>
      <p style={styles.companyLine}>{job.company} | {job.dates}</p>
      <p style={styles.paragraphItalic}>{job.summary}</p>
      <ul style={styles.bulletList}>
        {job.bullets.map((bullet, idx) => (
          <BulletPoint key={idx} text={bullet.text} />
        ))}
      </ul>
    </span>
  );

  const ExperienceSection = ({ experience }) => (
    <section id="ExperienceSection">
      <SectionHeader>Professional Experience</SectionHeader>
      {experience.map((job, idx) => (
        <JobEntry key={idx} job={job} />
      ))}
    </section>
  );

  const EducationEntry = ({ degree, detail }) => (
    <p style={styles.educationItem}>
      {degree}{detail}
    </p>
  );

  const EducationSection = ({ education }) => (
    <section id="EducationSection">
      <SectionHeader>Education</SectionHeader>
      {education.map((edu, idx) => (
        <EducationEntry key={idx} degree={edu.degree} detail={edu.detail} />
      ))}
    </section>
  );

  const CertificationEntry = ({ name, issuer, date }) => (
    <p style={styles.educationItem}>
      {name} | {issuer} | {date}
    </p>
  );

  const CertificationsSection = ({ certifications }) => (
    <section id="CertificationsSection">
      <SectionHeader>Certifications</SectionHeader>
      {certifications.map((cert, idx) => (
        <CertificationEntry key={idx} name={cert.name} issuer={cert.issuer} date={cert.date} />
      ))}
    </section>
  );
  return (
    <article style={styles.page}>
      {/* Header */}
      <h1 style={styles.name}>{persData.name}</h1>
      <h2 style={styles.title}>{title}</h2>
      <ContactInfo contact={persData} />

      {/* Professional Summary */}
      <section id="ProfessionalSummarySection">
        <SectionHeader style={styles.sectionHeader} >Professional Summary</SectionHeader>
        <p style={styles.paragraph}>{profSum}</p>
      </section>

      {/* Skills */}
      <SkillsSection skills={skillsData} />

      {/* Experience */}
      <ExperienceSection experience={profHistory} />

      {/* Education */}
      <EducationSection education={eduData} />

      {/* Certifications */}
      <CertificationsSection certifications={certData} />
    </article>
  );
};
