import icon from "../../assets/MillerIcon.ico";
import * as styles from "./AdBar.module.css";
import { CONTACT_INFO } from "../../constants/CONTACT_INFO";
export { AdBar };

function AdBar() {
  return (
    <>
      <div className={styles.navKickerBar}>{CONTACT_INFO.BUSINESS}</div>
      <header className={styles.navShell}>
        <div className={styles.navBrand}>
          <div className={styles.navLogo}>
            <img
              src={icon}
              alt="Miller Land Management"
              className={styles.navLogoImg}
            />
          </div>
          <div className={styles.navMeta}>
            <span className={styles.navKicker}>{CONTACT_INFO.BUSINESS}</span>
          </div>
        </div>

        <div className={styles.adWrapper} aria-label="Call To Action Links">
          <ul className={styles.adList}>
            <li key={CONTACT_INFO.EMAIL} 
              // className={styles.listItem}
              >
              <a
                href={`mailto:${CONTACT_INFO.EMAIL}`}
                className={styles.adLink}
              >
                ✉️ {CONTACT_INFO.EMAIL}
              </a>
            </li>
            <li key={CONTACT_INFO.PHONE}
              // className={styles.listItem}
            >
              <a href={`tel:${CONTACT_INFO.PHONE}`}
                className={styles.adLink}
              >
                📞 {CONTACT_INFO.PHONE}
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
