//import * as HomeStyles from "../../HomeStyles.module.css";
import { CONTACT_INFO } from "../../../../constants/CONTACT_INFO";
export { FooterSection };

function FooterSection() {
  const styles = {
    /* Footer */
    footer: {
      padding: `60px 20px`,
      borderTop: `1px solid #222`,
      background: `var(--tint-75)`
    },

    footerH3: {
      fontSize: `1.8rem`,
      fontWeight: 400,
      marginBottom: `15px`,
    },

    footerP: {
      color: `#888`,
      fontSize: `1rem`,
      lineHeight: `1.6`,
      marginBottom: `40px`,
      maxWidth: `600px`,
    },

    footerNavH4: {
      color: `#666`,
      fontSize: `0.9rem`,
      fontWeight: 600,
      textTransform: `uppercase`,
      letterSpacing: `1px`,
      marginBottom: `15px`,
    },

    footerNavA: {
      color: `#888`,
      textDecoration: `none`,
      display: `block`,
      marginBottom: `10px`,
      fontSize: `1rem`,
    },

    footerNavAHover: {
      color: `#fff`,
    },
  };
  return (
    <>
      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerNav}>
          <h4 style={styles.footerNavH4}>Miller Land Management LLC</h4>
          <a href={`mailto:${CONTACT_INFO.EMAIL}`} style={styles.footerNavA}>Owner: {CONTACT_INFO.OWNER}</a>
          <a href={`tel:${CONTACT_INFO.PHONE}`} style={styles.footerNavA}>Phone Number: {CONTACT_INFO.PHONE}</a>
          <a href={`mailto:${CONTACT_INFO.EMAIL}`} style={styles.footerNavA}>Email: {CONTACT_INFO.EMAIL}</a>
          <a href={CONTACT_INFO.FACEBOOK} style={styles.footerNavA}>Facebook: Miller Land Management</a>
          <a href={`https://millerlandman.com`} style={styles.footerNavA}>Domain: millerlandman.com</a>
        </div>
      </footer>
    </>
  );
}
