import { Link } from "react-router";
import { RESUME_LIST } from '../constants/RESUME';
import { useData } from '../context/DataContext';

const styles={
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
    skillText: {
      color: 'var(--text-2)',
    },
    skillRow: {
      margin: '6px 6px',
    },
  }


  const SkillRow = ({ label, value }) => (
    <li style={styles.skillRow}>
      <p className="body" style={styles.skillText}>
        <label id={label}>{label}: </label>
        <span className="pill">{value}</span>
      </p>
    </li>
  );

  const SkillsSection = ({ skills }) => (
    <section id="SkillsSection" className="card">
      <h3 className="card_title">Core Technical Skills</h3>
      <ul className="list">
      {skills.map((skill) => (
        <SkillRow key={skill.id} label={skill.label} value={skill.text} />
      ))}
      </ul>
    </section>
  );

export function WelcomePage() {
  const { dataContext } = useData();
  const resumeData = RESUME_LIST.find(r => r.id === dataContext) ?? RESUME_LIST[0];

  return (
    <main style={styles.Screen} aria-label="Welcome">
      <section style={styles.Hero}>
        <h1 style={styles.HeroTitle}>{resumeData.name}</h1>
        <p style={styles.HeroSubtitle}>{resumeData.professional_summary.title}</p>

        <p style={styles.HeroSummary}>
          {resumeData.professional_summary.text}
        </p>

        <div style={styles.HeroActions}>
          <Link className="btn btn-primary" to="/resume">View resume</Link>
          <Link className="btn" to="/projects">View projects</Link>
        </div>

        <div style={styles.HeroMeta}>
          <span className="pill">Indianapolis, IN</span>
          <span className="pill">Infrastructure: AWS | Enterprise | Distributed Systems | Cloud | Linux</span>
          <span className="pill">Frontend: Web Design | Optimization | SEO | State Management</span>
          <span className="pill">Backend: Security | Business Domain | Computing Optimization</span>
          <span className="pill">Integrations: REST | GraphQL | Messaging | Queues</span>

        </div>
      </section>

      <SkillsSection skills={resumeData.skills_data} />
    </main>
  );
}
