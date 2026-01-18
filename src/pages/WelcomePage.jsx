import { Link } from "react-router-dom";
import { PERSONAL_DATA } from '../constants/PERSONAL_DATA';
import { SKILLS_DATA } from '../constants/SKILLS_DATA';
import { PROFESSIONAL_SUMMARY } from '../constants/PROFESSIONAL_SUMMARY';

const skills = SKILLS_DATA;

export function WelcomePage() {
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
  }


  const SkillRow = ({ label, value }) => (
    <li style={styles.skillRow}>
      <p className="body" style={styles.skillText}>
        <label id={label}>{label}: </label>
        {value}
      </p>
    </li>
  );

  const SkillsSection = ({ skills }) => (
    <section id="SkillsSection" className="card">
      <h3 className="card_title">Core Technical Skills</h3>
      <ul className="list">
      {skills.map((skill, idx) => (
        <SkillRow key={idx} label={skill.label} value={skill.value} />
      ))}
      </ul>
    </section>
  );

  return (
    <main style={styles.Screen} aria-label="Welcome">
      <section style={styles.Hero}>
        <h1 style={styles.HeroTitle}>{PERSONAL_DATA.name}</h1>
        <p style={styles.HeroSubtitle}>{PERSONAL_DATA.title}</p>

        <p style={styles.HeroSummary}>
          {PROFESSIONAL_SUMMARY.find(obj => obj.id === 'primary').text}
        </p>

        <div style={styles.HeroActions}>
          <Link className="btn btn-primary" to="/resume">View resume</Link>
          <Link className="btn" to="/projects">View projects</Link>
        </div>

        <div style={styles.HeroMeta}>
          <span className="pill">Indianapolis, IN</span>
          {/* <span className="pill">Open to: Remote/Hybrid</span> */}
          <span className="pill">Infrastructure: AWS | Enterprise | Distributed Systems | Cloud | Linux</span>
          <span className="pill">Frontend: Web Design | Optimization | SEO</span>
          <span className="pill">Backend: Security | Business Domain | Computing Optimization</span>
          <span className="pill">Integrations: REST | GraphQL | Messaging | Queues</span>
          
        </div>
      </section>

      <SkillsSection skills={skills} />
    </main> 
  );
}
