// import * as HomeStyles from "../../HomeStyles.module.css";
// import {BreakpointContext} from "../../../../context/Breakpoint/BreakpointProvider";
// import {useContext} from "react";
import {useBreakpoint} from "../../../../context/BreakpointContext";
import {useSmoothScroll} from "../../../../hooks/useSmoothScroll";
export { HeroSection };

function HeroSection() {
  const screenSize = useBreakpoint();
  const smoothScrollTo = useSmoothScroll();

  const handleQuoteClick = () => {
    const contactFormSection = document.getElementById('contact-form');
    if (contactFormSection) {
      smoothScrollTo(contactFormSection, {align: 'top', margin:60});
    }
  };

  const styles = {

    /* Hero Section */
  heroSection: {
  // stripped hero area
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '60px 20px',
  background: 'var(--tint-75)',
},

  heroSectionXsm: {
    padding: '16px',
  },

heroContent: {
  maxWidth: '800px',
  textAlign: 'left',
},

heroH1: {
  fontSize: '3.5rem',
  fontWeight: 500,
  lineHeight: 1.2,
  marginBottom: '20px',
},

heroSubtitle: {
  fontSize: '1.3rem',
  marginBottom: '30px',
  fontWeight: 400,
  color: 'var(--My-Gray)',
},

    ctaButton: {
      backgroundColor: "color-mix(in srgb, var(--My-Orange) 70%, transparent 30%)",
      color: "white",
      border: "none",
      padding: "16px 40px",
      margin: "20px",
      fontSize: "1.1rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.3s",
    },
  };

  return (
    <>
      {/* Hero Section */}
      <section style={screenSize==='xsm'? {...styles.heroSection, ...styles.heroSectionXsm} : styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroH1}>Miller Land Management</h1>
          <p style={styles.heroSubtitle}>
            Serving Central Indiana with honest advice, fair pricing, and
            reliable land management services.
          </p>
          <button style={styles.ctaButton} onClick={handleQuoteClick}>Get a Free Quote</button>
        </div>
      </section>
    </>
  );
}
