import { SideNav } from "../features/Nav/SideNav.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "../features/Nav/TopBar.jsx";
import { useBreakpoint } from "../context/BreakpointContext";

export function MobileLayout(
  topBarHeight = 60
) {
  const location = useLocation();
  const screenSize = useBreakpoint();

  const styles = {
    App: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100dvh",
      width: "100%",
    },
    Main: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      width: "100%",
    },
    Content: {
      padding: "18px",
      flex: 1,
      width: "100%",
      boxSizing: "border-box",
    },
  };

  return (
    <div id="App" style={styles.App}>
      <SideNav screenSize={screenSize} topBarHeight={topBarHeight} />
      <main id="Main" style={styles.Main} role="main">
        <TopBar topBarHeight={topBarHeight} />
        <div
          id="Content"
          style={styles.Content}
          className="fadein"
          key={location.pathname}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
