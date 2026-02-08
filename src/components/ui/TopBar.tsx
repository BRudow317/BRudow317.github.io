
import { PERSONAL_DATA, type PersonalSiteLink } from '../../constants/PERSONAL_DATA';
import type { ScreenSize } from "../../context/BreakpointContext";
// import { PROFESSIONAL_SUMMARY } from '../../constants/PROFESSIONAL_SUMMARY';
// import { SITE_CONTEXT } from '../../constants/SITE_CONTEXT';
// import { useData } from '../../context/DataContext';

type TopBarProps = {
  name?: string;
  email?: string;
  sites?: PersonalSiteLink[];
  screenSize?: ScreenSize;
  topBarHeight?: number;
};

export const TopBar = (
  {
    name = PERSONAL_DATA.name,
    // title = PERSONAL_DATA.title,
    email = PERSONAL_DATA.email,
    sites = PERSONAL_DATA.sites,
    // infoSites = PERSONAL_DATA.infoSites,
    screenSize = 'lg',
    topBarHeight = 60,
  }: TopBarProps = {}
)  => {
  // Get the current data context
  // const { dataContext } = useData();

  // Get title from professional summary, fallback to PERSONAL_DATA.title
  // const profSumObj = PROFESSIONAL_SUMMARY.find((s) => s.id === dataContext)
  //   || PROFESSIONAL_SUMMARY.find((s) => s.id === "default")
  //   || PROFESSIONAL_SUMMARY[0];
  // const title = profSumObj.title || PERSONAL_DATA.title;

  // Get info site link based on context, fallback to default
  // const infoSite = infoSites.find((site) => site.type === dataContext)
  //   || infoSites.find((site) => site.type === "default")
  //   || infoSites[0];

  const isSmallScreen = screenSize === "xsm" || screenSize === "sm" || screenSize === "md";
  const styles = {
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

  const getSiteUrl = (siteId: string) =>
    sites.find((site) => site.id === siteId)?.url ?? "#";

  const largeRender = 
    <section id="topbar" style={styles.TopBar} name="topbar">
      <div id="topbarrow" style={styles.TopBarRow} name="TopBarRow">
      
      <h3 style={{...styles.BrandMeta}}><a href={getSiteUrl("linkedin")} target="_blank" rel="noreferrer"
      >{name}</a></h3>
      {/* <h3 style={{...styles.BrandMeta}}><a href={infoSite.url} target="_blank" rel="noreferrer"
      >{title}</a></h3> */}
      <h3 style={{...styles.BrandMeta}}><a href={getSiteUrl("github")} target="_blank" rel="noreferrer"
      >GitHub</a></h3>
      <h3 style={{...styles.BrandMeta}}><a href={getSiteUrl("linkedin")} target="_blank" rel="noreferrer"
        >Linkedin</a>
      </h3>
      <h3 style={{...styles.BrandMeta}}><a href={`mailto:${email}`}>{email}</a></h3>
      
      </div>
    </section>;

  const smallRender = 
    <section id="topbar" style={styles.TopBar} name="topbar">
      <div id="topbarrow" style={styles.TopBarRow} name="TopBarRow">
      <h3 style={{...styles.BrandMeta, flex: 2}}><a href={getSiteUrl("linkedin")} target="_blank" rel="noreferrer"
      >{name}</a></h3>
      <h3 style={{...styles.BrandMeta, flex: 1}}><a href={getSiteUrl("github")} target="_blank" rel="noreferrer"
      >GitHub</a></h3>
      <h3 style={{...styles.BrandMeta, flex: 1}}><a href={getSiteUrl("linkedin")} target="_blank" rel="noreferrer"
        >Linkedin</a>
      </h3>
      <h3 style={{...styles.BrandMeta, flex: 3}}><a href={`mailto:${email}`}>{email}</a></h3>
      </div>
    </section>;

  return isSmallScreen ? smallRender : largeRender;
};
