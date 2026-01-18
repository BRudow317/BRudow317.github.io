import { SideNav } from "../features/Nav/SideNav.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "../features/Nav/TopBar.jsx";

export function Layout() {
  const location = useLocation();

  const styles = {
    App: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100dvh",
      minWidth: "100dvw",
      width: "100%",
      height: "100%",
    },
    Main: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    Content: {
      padding: "18px",
      width: "100%",
      height: "100%",
      // borderTop: "2px solid var(--border-1)",
      // borderLeft: "2px solid var(--border-1)",
    },
  };

  return (
    <div id="App" style={styles.App}>
      <SideNav />
      <main id="Main" style={styles.Main} role="main">
        <TopBar />
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
