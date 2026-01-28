/**
 * @description Footer Section component for my portfolio site.
 *
 * @exports FooterSection as a React component.
 *
 */
import { useLocation } from "react-router";
import { useMemo } from "react";
import { NavItems } from "../../constants/NavItems.js";
import { PROJECT_DATA } from "../../constants/PROJECT_DATA.js";
import { PERSONAL_DATA } from "../../constants/PERSONAL_DATA.js";

export function Footer() {
  const styles = {
    /* Footer */
    footer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      borderTop: "2px solid var(--border-1)",
      background: "var(--bg-2)",
      width: "100%",
      marginTop: "auto",
      padding: "10px 40px",
      gap: "40px",
    },
    footerNav: {
      // color: "var(--text-2)",
      // fontSize: "1rem",
      // lineHeight: "1.5",
      // marginBottom: "40px",
      // maxWidth: "300px",
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "flex-end",
      // border: "2px solid var(--border-1)",
    },

    footerH3: {
      fontSize: "16px",
      fontWeight: 600,
      marginTop: "10px",
      marginBottom: "20px",
      color: "var(--text-2)",
    },

    footerNavH4: {
      color: "var(--text-2)",
      fontSize: "0.9rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "15px",
      marginTop: "0",
    },

    footerNavA: {
      color: "var(--text-2)",
      textDecoration: "none",
      display: "block",
      marginBottom: "10px",
      fontSize: ".75rem",
    },

    footerNavAHover: {
      color: "var(--text-1)",
    },
  };

  const location = useLocation();

  const activeLabel = useMemo(() => {
    const path = location.pathname;
    const match = NavItems.find((x) => x.to === path);
    if (match) return match.label;

    if (path.startsWith("/projects/")) {
      const id = path.split("/")[2] || "";
      const p = PROJECT_DATA.find((x) => x.id === id);
      return p ? p.name : "Projects";
    }

    return "Intro";
  }, [location.pathname]);

  const personalSite = PERSONAL_DATA.sites.find(
    (site) => site.type === "personal",
  ).url;
  const profileSite = PERSONAL_DATA.sites.find(
    (site) => site.type === "profile",
  ).url;
  const linkedInSite = PERSONAL_DATA.sites.find(
    (site) => site.id === "linkedin",
  ).url;

  return (
    <footer id="footer" type="footer" style={styles.footer}>
      <div style={styles.footerNav}>
        <h3 style={styles.footerH3}>
          <a href={personalSite}>
            © {new Date().getFullYear()} Cloud Voyages LLC
          </a>
        </h3>
        <h4 style={styles.footerNavA}>
          <a href="https://fsf.org/">License: GNU GENERAL PUBLIC LICENSE</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href="">Current Page: {activeLabel}</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href="">Device Type: {navigator.userAgent}</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href="">Location: TODO</a>
        </h4>
      </div>
      <div style={styles.footerNav}>
        <h3 style={styles.footerH3}>Contact Info</h3>
        
        <h4 style={styles.footerNavA}>
          <a href={`mailto:${PERSONAL_DATA.email}`}>Owner: {PERSONAL_DATA.name}</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href={`tel:${PERSONAL_DATA.phone}`}>Phone Number: {PERSONAL_DATA.phone}</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href={`mailto:${PERSONAL_DATA.email}`}>Email: {PERSONAL_DATA.email}</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href={linkedInSite}>LinkedIn: {PERSONAL_DATA.name}</a>
        </h4>
        <h4 style={styles.footerNavA}>
          <a href={profileSite}>Domain: {profileSite}</a>
        </h4>
      </div>
    </footer>
  );
}
