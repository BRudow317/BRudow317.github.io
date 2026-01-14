import { NavBar } from "../features/NavBar/NavBar.jsx";
import { Outlet } from "react-router-dom";
import {default as image} from "../assets/images/rudow_fam.jpg";
import {useBreakpoint} from "../context/BreakpointContext";

export { Layout };

function Layout() {
  const screenSize = useBreakpoint();
  // const isMobile = screenSize === "xsm" || screenSize === "sm";

  const styles = {
    SiteContainer: {
      width: "100%",
      height: "100svh",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
    },

    AppContainer: {
      width: "100%",
      height: "100svh",
      padding: 0,
      margin: 0,
      boxSizing: "border-box",
      color: "var(--text-color)",
      // backgroundColor: "var(--bg)",
    },

    BackgroundImage: {
      isolation: "isolate",
      zIndex: -5,
      position: "fixed",
      inset: 0,
      padding: 0,
      margin: 0,
      backgroundImage: `url(${image})`,
      backgroundAttachment: "scroll",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 20%",
      backgroundColor: "var(--bg)",

    },
  };

  return (
    <>
      <div style={styles.BackgroundImage} role="Background-Image" />
      <div style={styles.SiteContainer} role="Site-Container">
        <NavBar screenSize={screenSize} />
        <div style={styles.AppContainer} role="App-Container">
          <Outlet />
      </div>
      </div>
    </>
  );
}

