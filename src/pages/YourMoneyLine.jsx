
export const YourMoneyLine = () => {

   const styles = {
    container: {
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      lineHeight: '1.6',
      color: 'var(--text-primary)',
      backgroundColor: 'var(--bg)',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '40px',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    header: {
      borderBottom: '3px solid #005a87',
      paddingBottom: '20px',
      marginBottom: '30px',
      textAlign: 'center',
    },
    h1: {
      color: 'var(--primary)',
      fontSize: '2.2em',
      marginBottom: '10px',
    },
    h2: {
      color: 'var(--text-1)',
      marginTop: '40px',
      borderLeft: '5px solid var(--border-1)',
      paddingLeft: '15px',
    },
    h3: {
      color: 'var(--text-2)',
      fontWeight: '600',
      marginTop: '25px',
    },
    p: {
      marginBottom: '15px',
      textAlign: 'justify',
    },
    ul: {
      marginBottom: '20px',
    },
    li: {
      marginBottom: '8px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      margin: '25px 0',
      fontSize: '0.95em',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
    },
    th: {
      backgroundColor: 'var(--bg-2)',
      color: 'var(--text-1)',
      textAlign: 'left',
      padding: '12px 15px',
      border: '1px solid var(--border-1)',
    },
    td: {
      padding: '12px 15px',
      border: '1px solid var(--border-1)',
    },
    trEven: {
      backgroundColor: 'var(--bg-2)',
    },
    highlightBox: {
      backgroundColor: 'var(--bg-3)',
      border: '1px solid var(--border-2)',
      padding: '20px',
      borderRadius: '5px',
      margin: '20px 0',
    },
    quote: {
      fontStyle: 'italic',
      color: 'var(--text-2)',
      borderLeft: '3px solid var(--border-2)',
      paddingLeft: '15px',
      margin: '20px 0',
    },
    footerLinks: {
      fontSize: '0.85em',
      color: 'var(--text-2)',
      marginTop: '50px',
      borderTop: '1px solid var(--border-1)',
      paddingTop: '20px',
    },
    link: {
       color: 'var(--cyan)',
      textDecoration: 'none',
    },
    imagePlaceholder: {
        backgroundColor: 'var(--bg-3)', 
        padding: '20px', 
        textAlign: 'center', 
        color: 'var(--text-2)', 
        border: '1px dashed var(--border-2)',
        margin: '20px 0'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.h1}>The Structural and Psychological Dimensions of Corporate Financial Wellness</h1>
        <p style={{ textAlign: 'center' }}>An Analysis of Your Money Line Indianapolis</p>
      </header>

      <section>
        <p style={styles.p}>
          The evolution of employee benefits in the United States has transitioned from a focus on basic health and retirement packages toward a more integrated model of holistic well-being. At the forefront of this movement in the Midwestern United States is <strong>Your Money Line (YML)</strong>, an Indianapolis-based financial wellness platform that synergizes advanced technological infrastructure with specialized human coaching.
        </p>
        <p style={styles.p}>
          Founded by Peter Dunn (professionally known as <em>Pete the Planner®</em>), the organization represents a departure from traditional brokerage-based advice. By positioning itself as a corporate benefit rather than a retail service, Your Money Line addresses financial stress as a primary driver of workplace disengagement and absenteeism.
        </p>
      </section>

      <section>
        <h2 style={styles.h2}>The Organizational Architecture and Leadership</h2>
        <p style={styles.p}>
          Headquartered in Indianapolis (9450 N. Meridian St.), YML serves as a hub for a national operation supporting hundreds of thousands of households. The company's trajectory began in 2012 when Dunn divested from traditional investment practices to focus on the "money decisions" that dictate stability for the average worker.
        </p>
        <div style={styles.highlightBox}>
          <strong>Core Philosophy:</strong> The leadership team, including COO Molly Fohrer and Head of Sales Brad Kime, has cultivated a culture centered on <strong>empathy and the elimination of financial shame</strong>.
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>The Dual Ecosystem: YML vs. Hey Money</h2>
        <p style={styles.p}>
          Your Money Line operates alongside a direct-to-consumer entity known as "Hey Money." Together, they democratize financial expertise, though YML remains the primary vehicle for corporate intervention.
        </p>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Entity</th>
              <th style={styles.th}>Primary Market</th>
              <th style={styles.th}>Service Model</th>
              <th style={styles.th}>Accessibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><strong>Your Money Line</strong></td>
              <td style={styles.td}>B2B (Employers)</td>
              <td style={styles.td}>Employer-sponsored benefit</td>
              <td style={styles.td}>Free to employees via HR</td>
            </tr>
            <tr style={styles.trEven}>
              <td style={styles.td}><strong>Hey Money</strong></td>
              <td style={styles.td}>B2C (Consumer)</td>
              <td style={styles.td}>Monthly subscription</td>
              <td style={styles.td}>Direct signup</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.h2}>The Technical Infrastructure of Financial Stability</h2>
        <p style={styles.p}>
          The platform is built upon an "all-in-one" digital architecture using AI and automated data integration to provide real-time insights.
        </p>

        <div style={styles.imagePlaceholder}>
             
        </div>

        <h3 style={styles.h3}>Key Digital Tools</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tool</th>
              <th style={styles.th}>Primary Function</th>
              <th style={styles.th}>Behavioral Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><strong>Stability Index</strong></td>
              <td style={styles.td}>Quantitative health metric</td>
              <td style={styles.td}>Benchmarking and progress tracking</td>
            </tr>
            <tr style={styles.trEven}>
              <td style={styles.td}><strong>Money Personality</strong></td>
              <td style={styles.td}>Qualitative psychological profile</td>
              <td style={styles.td}>Understanding emotional triggers</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Smart Budgeting</strong></td>
              <td style={styles.td}>Real-time expense categorization</td>
              <td style={styles.td}>Reduced manual effort; increased awareness</td>
            </tr>
            <tr style={styles.trEven}>
              <td style={styles.td}><strong>Personalized Podcast</strong></td>
              <td style={styles.td}>Weekly audio summary</td>
              <td style={styles.td}>High engagement; time-efficient learning</td>
            </tr>
          </tbody>
        </table>
        <p style={styles.p}><em>Note: These tools are strictly "sales-free," ensuring users are never prompted to purchase financial products.</em></p>
      </section>

      <section>
        <h2 style={styles.h2}>The Human Intervention: 1:1 Financial Coaching</h2>
        <p style={styles.p}>
          While technology provides the framework, YML emphasizes that sustainable change requires human intervention. All guides are <strong>Accredited Financial Counselors (AFC®)</strong> or <strong>Certified Financial Planner™ (CFP®)</strong> practitioners.
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong>Unbiased Guidance:</strong> Guides are salaried and do not receive commissions.</li>
          <li style={styles.li}><strong>Accessibility:</strong> Available 12 hours/day, 5 days/week via phone, email, chat, and text.</li>
          <li style={styles.li}><strong>Impact:</strong> 96% of participants report increased confidence after a session.</li>
        </ul>

        <div style={styles.quote}>
          <h3 style={styles.h3}>Case Study: Triad Financial Services</h3>
          <p style={styles.p}>
            Upon launching Your Money Line to their 600+ employees, Triad observed a shift in organizational culture. Employees reported feeling comfortable discussing sensitive topics due to the "not one-size-fits-all" approach, leading to higher engagement and productivity.
          </p>
        </div>
      </section>

      <section>
        <h2 style={styles.h2}>Theoretical Foundations: Mechanics vs. Behavior</h2>
        <p style={styles.p}>
          A central tenet of the philosophy is distinguishing between financial <strong>mechanics</strong> (math/tools) and financial <strong>behavior</strong> (psychology).
        </p>
        
        <div style={styles.imagePlaceholder}>
             
        </div>

        <ul style={styles.ul}>
          <li style={styles.li}><strong>Mechanics (The "How"):</strong> Solvable via education. E.g., Asset allocation, debt "order of operations," tax documents.</li>
          <li style={styles.li}><strong>Behavior (The "Why"):</strong> Rooted in emotion, fatigue, and habit. E.g., The "eerie charms" of convenience or retail therapy.</li>
        </ul>
        <p style={styles.p}>
          Most high-income professionals misdiagnose behavioral issues as mechanical ones. YML focuses on bridging the gap between knowing what to do and actually doing it.
        </p>
      </section>

      <section>
        <h2 style={styles.h2}>The "Quest for Less" and Income Dependence</h2>
        <p style={styles.p}>
          For the 2025/2026 fiscal years, YML introduced the "Quest for Less," arguing that stability comes from reducing lifestyle chaos rather than just increasing income. This combats <strong>"Income-Dependence Creep."</strong>
        </p>

        <h3 style={styles.h3}>5-Year Projection: The Trap of Linear Growth</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Financial Scenario</th>
              <th style={styles.th}>Initial State</th>
              <th style={styles.th}>5% Annual Raise Outcome</th>
              <th style={styles.th}>Behavioral Trap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><strong>Household Income</strong></td>
              <td style={styles.td}>$100,000</td>
              <td style={styles.td}>$128,000</td>
              <td style={styles.td}>Linear income growth</td>
            </tr>
            <tr style={styles.trEven}>
              <td style={styles.td}><strong>Monthly Take-Home</strong></td>
              <td style={styles.td}>$5,200</td>
              <td style={styles.td}>$6,600</td>
              <td style={styles.td}>Emotional habit growth</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Variable Expenses</strong></td>
              <td style={styles.td}>$2,600</td>
              <td style={styles.td}>$3,300</td>
              <td style={styles.td}>Inflation compounding</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.h2}>Specialized Sector Support: Education & PSLF</h2>
        <p style={styles.p}>
          A major vertical for YML is K-12 education, focusing on Public Service Loan Forgiveness (PSLF). YML "PSLF pros" have helped secure over <strong>$100 million</strong> in forgiveness.
        </p>
        <ul style={styles.ul}>
          <li style={styles.li}><strong>Carmel Clay Schools:</strong> Secured over $1 million in total forgiveness.</li>
          <li style={styles.li}><strong>MSD Wayne Township:</strong> Average of $94,900 forgiven per teacher.</li>
          <li style={styles.li}><strong>Franklin Community Schools:</strong> Used as a "secret retention tool."</li>
        </ul>
      </section>

      <section>
        <h2 style={styles.h2}>The 2026 Roadmap</h2>
        <p style={styles.p}>
          Informed by the "2025 Employee Financial Behavior Report," YML is launching initiatives to address the post-inflationary economy.
        </p>
        
        <h3 style={styles.h3}>Strategic Initiatives</h3>
        <ul style={styles.ul}>
          <li style={styles.li}><strong>Integrated Tax Filing:</strong> Partnering with "April" to offer flat-fee ($29.99) federal and state filing, countering the expiration of the IRS Direct File pilot.</li>
          <li style={styles.li}><strong>2026 Financial Wellness Calendar:</strong> A month-by-month roadmap for HR leaders, focusing on themes like "Workforce Resilience" (Jan), "Identity Protection" (Feb), and "Mental Health" (May).</li>
        </ul>
      </section>

      <section>
        <h2 style={styles.h2}>Comparative Analysis (2026)</h2>
        <p style={styles.p}>
          YML is often compared to SmartDollar, FinFit, and Origin. YML differentiates itself via a "Coaching-First" model (vs. SmartDollar's curriculum-first) and a "Sales-Free" model (vs. FinFit's lending products).
        </p>

        <h3 style={styles.h3}>User Sentiment (G2 Reviews)</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Metric</th>
              <th style={styles.th}>Rating (G2)</th>
              <th style={styles.th}>Key Strength</th>
              <th style={styles.th}>Key Weakness</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><strong>Overall Experience</strong></td>
              <td style={styles.td}>4.6 / 5.0</td>
              <td style={styles.td}>Personalized Support</td>
              <td style={styles.td}>Syncing Performance</td>
            </tr>
            <tr style={styles.trEven}>
              <td style={styles.td}><strong>Ease of Use</strong></td>
              <td style={styles.td}>4.8 / 5.0</td>
              <td style={styles.td}>Intuitive Interface</td>
              <td style={styles.td}>Occasional "Clunkiness"</td>
            </tr>
            <tr>
              <td style={styles.td}><strong>Quality of Coaching</strong></td>
              <td style={styles.td}>4.9 / 5.0</td>
              <td style={styles.td}>Expertise of Guides</td>
              <td style={styles.td}>Limited Session Time</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.h2}>Conclusion</h2>
        <p style={styles.p}>
          As Your Money Line expands from its Indianapolis base, it continues to set a new standard for corporate benefits by integrating AI with high-touch human empathy. By addressing both the mechanics of money management and the behaviors driving them, YML offers a comprehensive solution that transforms the employer-employee relationship, increasing retention, productivity, and financial enlightenment.
        </p>
      </section>

      <div style={styles.footerLinks}>
        <h3 style={styles.h3}>Sources & Further Reading</h3>
        <ul style={styles.ul}>
          <li style={styles.li}><a href="https://yourmoneyline.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Your Money Line Official Platform</a></li>
          <li style={styles.li}><a href="https://ibj.com" target="_blank" rel="noopener noreferrer" style={styles.link}>Indianapolis Business Journal - Pete the Planner Columns</a></li>
          <li style={styles.li}><a href="https://g2.com" target="_blank" rel="noopener noreferrer" style={styles.link}>G2 Reviews: Your Money Line 2026</a></li>
          <li style={styles.li}><a href="https://indyshrm.org" target="_blank" rel="noopener noreferrer" style={styles.link}>IndySHRM Partnerships</a></li>
        </ul>
      </div>

    </div>
  );
};