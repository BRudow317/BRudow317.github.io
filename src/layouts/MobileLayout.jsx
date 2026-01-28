import { SideNav } from "../components/ui/SideNav.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "../components/ui/TopBar.jsx";
import { Footer } from "../components/ui/Footer.jsx";

export function MobileLayout({
  topBarHeight = 60,
  screenSize = 'sm'
} = {}) {
  const location = useLocation();
  console.log("Screen Size in MobileLayout:", screenSize);
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
        <TopBar screenSize={screenSize} topBarHeight={topBarHeight} />
        <div
          id="Content"
          style={styles.Content}
          className="fadein"
          key={location.pathname}
        >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
