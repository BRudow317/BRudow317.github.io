
import { PERSONAL_DATA } from '../../constants/PERSONAL_DATA';
export const TopBar = (
  {
    name = PERSONAL_DATA.name,
    title = PERSONAL_DATA.title,
    email = PERSONAL_DATA.email,
    sites = PERSONAL_DATA.sites,
    infoSites = PERSONAL_DATA.infoSites,
    screenSize = 'lg',
    topBarHeight = 60,
  } = {}
)  => {
  let isSmallScreen = screenSize === "xsm" || screenSize === "sm" || screenSize === "md";
  let styles = {
    TopBar: {
      /* position: sticky;
      top: 0; */
      display: "flex",
      flexDirection: "column",
      width: "100%",
      zIndex: 5,
      backgroundColor: "var(--bg-2)",
      backdropFilter: "blur(10px)",
      height: isSmallScreen ? `${topBarHeight}px` : "auto",
      minHeight: `${topBarHeight}px`,
      padding: "0",
      boxShadow: "var(--box-shadow-1)",
      justifyContent: "center",
      alignItems: "center",
      borderBottom: "2px solid var(--border-1)",
      boxSizing: "border-box",
    },

    TopBarRow: {
      // height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      // gap: isSmallScreen ? "0px" : "12px",
      alignItems: "center",
      padding: isSmallScreen ? "0px 6px" : "0px 18px",
      justifyContent: "center",
      gap: isSmallScreen ? "0" : "12px",
      flexWrap: screenSize === "xsm" ? "wrap" : "nowrap",
      whiteSpace: "nowrap",
    },
    
    BrandMeta: {
        fontSize: "clamp(14px, 2vw, 24px)",
        color: "var(--text-1)",
        textShadow: "var(--text-shadow)",
        // marginTop: isSmallScreen ? "2px" : "8px",
        margin: "0",
        textAlign: "center",
      },
  }

  const largeRender = 
    <section id="topbar" style={styles.TopBar} name="topbar">
      <div id="topbarrow" style={styles.TopBarRow} name="TopBarRow">
      
      <h3 style={{...styles.BrandMeta}}><a href={sites.find(site => site.id === "linkedin").url} target="_blank" rel="noreferrer"
      >{name}</a></h3>
      <h3 style={{...styles.BrandMeta}}><a href={infoSites.find(site => site.id === "softwareengineer").url} target="_blank" rel="noreferrer"
      >{title}</a></h3>
      <h3 style={{...styles.BrandMeta}}><a href={sites.find(site => site.id === "github").url} target="_blank" rel="noreferrer"
      >GitHub</a></h3>
      <h3 style={{...styles.BrandMeta}}><a href={sites.find(site => site.id === "linkedin").url} target="_blank" rel="noreferrer"
        >Linkedin</a>
      </h3>
      <h3 style={{...styles.BrandMeta}}><a href={`mailto:${email}`}>{email}</a></h3>
      
      </div>
    </section>;

  const smallRender = 
    <section id="topbar" style={styles.TopBar} name="topbar">
      <div id="topbarrow" style={styles.TopBarRow} name="TopBarRow">
      <h3 style={{...styles.BrandMeta, flex: 2}}><a href={sites.find(site => site.id === "linkedin").url} target="_blank" rel="noreferrer"
      >{name}</a></h3>
      <h3 style={{...styles.BrandMeta, flex: 1}}><a href={sites.find(site => site.id === "github").url} target="_blank" rel="noreferrer"
      >GitHub</a></h3>
      <h3 style={{...styles.BrandMeta, flex: 1}}><a href={sites.find(site => site.id === "linkedin").url} target="_blank" rel="noreferrer"
        >Linkedin</a>
      </h3>
      <h3 style={{...styles.BrandMeta, flex: 3}}><a href={`mailto:${email}`}>{email}</a></h3>
      </div>
    </section>;

  return isSmallScreen ? smallRender : largeRender;
};
