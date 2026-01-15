
import { PERSONAL_DATA } from "../../../constants/PERSONAL_DATA";
import { useLocation, useMemo } from "react-router-dom";
import { NavItems } from "../../Nav/NavItems";
import { PROJECT_DATA } from "../../constants/PROJECT_DATA.js";

export const FooterBar = (
    styles={
        FooterBar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 18px",
        },
        FooterCrumb: {
            display: "flex",
            flexDirection: "row",
            padding: "0",
            fontFamily: "var(--mono)",
            fontSize: "12px",
            color: "var(--text-2)",
        },
    }
) => {

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

    return (
        <footer style={styles.FooterBar}>
            <h4>© {new Date().getFullYear()} Cloud Voyages LLC</h4>
            <h4 style={styles.FooterCrumb}><a href="https://fsf.org/">License: GNU GENERAL PUBLIC LICENSE</a></h4>
            <h4 style={styles.FooterCrumb}><a href="">Current Page: {activeLabel}</a></h4>
            <h4 style={styles.FooterCrumb}><a href="">Device Type: {navigator.userAgent}</a></h4>
            <h4 style={styles.FooterCrumb}><a href="">Location: {PERSONAL_DATA.contact.location}</a></h4>
        </footer>
    );
}