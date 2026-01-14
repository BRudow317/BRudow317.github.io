import { NavLink } from "react-router-dom";
import { ROUTES, NAV_NAMES } from "../../constants/routes.js";
import { useTheme } from "../../context/ThemeContext";

const styles = {
    NavBar: {
        width: "100%",
        height: "56px",
        overflow: "hidden",
        // border: "var(--border-1)",
        backgroundColor: "var(--glass-4)",
        // position: "sticky",
        // top: 0,
    },
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
        height: "100%",
        gap: "4px",
    },
    NavListItem: {
        height: "80%",
        width: "100%",
        maxWidth: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    NavLink: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        textAlign: "center",
        textDecoration: "none",
        transition: "all 200ms ease",
        color: "var(--text-color)",
        backgroundColor: "var(--glass-3)",
        borderRadius: "12px",
        border: "var(--border-1)",
        cursor: "pointer",

    },
    isActive: {
        // transform: "translateY(var(--lift-y-1, 1px))",
        filter: "brightness(1.03)"
    }
};
// {({ isActive }) => isActive 
//                 ? { ...styles.NavLink, ...active } : styles.NavLink}

export const NavBar = () => {
    const { toggleTheme } = useTheme();
  return (
    <nav style={styles.NavBar}
        name="NavBar"
        role="navigation"
    >
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
                role="button" 
                id={`Nav:${key}`}
                style={ styles.NavLink }
                to={value}
                end={value === "/"}
            >
                {NAV_NAMES[value]}
            </NavLink>
        </li>))
      }
      <li 
        key="ThemeToggle"
        name="NavListItem"
        style={styles.NavListItem}
        role="button"
      ><button
        style={{ ...styles.NavLink }}
        onClick={toggleTheme}
      >Theme</button></li>
    </ul>
    </nav>
  );
}
