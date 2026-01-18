
import { PERSONAL_DATA } from '../../constants/PERSONAL_DATA';
export const TopBar = (
  {
    name = PERSONAL_DATA.name,
    title = PERSONAL_DATA.title,
    email = PERSONAL_DATA.email,
    sites = PERSONAL_DATA.sites,
    infoSites = PERSONAL_DATA.infoSites,
  } = {}

) => {
  
  const styles = {
    TopBar: {
      /* position: sticky;
  top: 0; */
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      width: "100%",
      zIndex: 5,
      backgroundColor: "var(--bg-2)",
      backdropFilter: "blur(10px)",
      minHeight: "60px",
      padding: "0",
      boxShadow: "var(--box-shadow-1)",
      justifyContent: "space-between",
      borderBottom: "2px solid var(--border-1)",
    },

    TopBarRow: {
      display: "flex",
      flexDirection: "row",
      gap: "18px",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
    },

    ContactInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "8px",
      alignItems: "center",
      fontSize: "18px",
    },
  };

  return (
    <section style={styles.TopBar}>
      <div id="TopBarRow1" style={styles.TopBarRow}>
      <h3 style={styles.BrandName}><a href={sites.find(site => site.id === "linkedin").url} target="_blank" rel="noreferrer"
      >{name}</a></h3>
      <h3 style={styles.BrandMeta}><a href={infoSites.find(site => site.id === "softwareengineer").url} target="_blank" rel="noreferrer"
      >{title}</a></h3>
      <h3 style={styles.BrandMeta}><a href={sites.find(site => site.id === "github").url} target="_blank" rel="noreferrer"
      >GitHub</a></h3>
      <h3 style={styles.BrandMeta}><a href={sites.find(site => site.id === "linkedin").url} target="_blank" rel="noreferrer"
        >Linkedin</a>
      </h3>
      <h3 style={styles.BrandMeta}><a href={`mailto:${email}`}>{email}</a></h3>
      </div>
    </section>
  );
};
