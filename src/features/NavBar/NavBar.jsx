import { NavLink, useLocation } from "react-router-dom";
import { ROUTES, NAV_NAMES } from "../../utils/Constants/routes.js";
// import toProperCase from "../../utils/toProperCase.js";
// import { max } from "@floating-ui/utils";
// import "../../themes/MediaFlexLayouts.css";
// import "./NavBar.module.css";

// import * as MediaQuery from "./MediaQuery.module.css";
// CSS to className



const styles = {
    NavList: {
        zIndex: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        listStyleType: "none",
        padding: 0,
        margin: 0,
        width: "100%",
        height: "56px",
        gap: "4px",
        overflow: "hidden",
        border: "1px solid var(--Text-Color)",
        backgroundColor: "var(--GlobalBackground)",

    },
    NavListItem: {
        height: "100%",
        width: "100%",
        maxWidth: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--My-GlobalBackground)",
        borderRadius: "12px",
        marginTop: "4px",
        marginBottom: "4px",
    },
    NavLink: {
        textAlign: "center",
        // textStyle: "",
        textDecoration: "none",
        transition: "all 200ms ease",
        color: "var(--My-GlobalTextColor)",
        // backgroundColor: "var(--My-Navy)",        
    },
    isActive: {
        // transform: "translateY(var(--lift-y-1, 1px))",
        filter: "brightness(1.03)"
    }
};
// {({ isActive }) => isActive 
//                 ? { ...styles.NavLink, ...active } : styles.NavLink}

export const NavBar = () => {
    const location = useLocation(); //{location}
  return (
    // <div role="navigation" 
    //     name="NavShell"
    //     style={styles.NavShell}
    // >
    <ul style={styles.NavList}
        name="NavList"
    >
      {Object.entries(ROUTES).map(
        ([key, value]) => (
        <li key={key}
            name="NavListItem"
            style={styles.NavListItem}
            role="button"
        >
            <NavLink
                name="NavLink"
                // role="button" 
                id={`Nav:${key}`}
                style={ styles.NavLink }
                className ={ ({ isActive }) => isActive ? "green-style" : "green-style:active" }
                to={value}
                end={value === "/"}
            >
                {NAV_NAMES[value]}
            </NavLink>
        </li>
      ))}
    </ul>
    // </div>
  );
}
