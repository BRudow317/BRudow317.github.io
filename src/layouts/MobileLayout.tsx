import { SideNav } from "../components/ui/SideNav";
import { Outlet, useLocation } from "react-router";
import { TopBar } from "../components/ui/TopBar";
import { Footer } from "../components/ui/Footer";
import type { ScreenSize } from "../context/BreakpointContext";
import React from "react";

type MobileLayoutProps = {
  topBarHeight?: number;
  screenSize?: ScreenSize;
};

export function MobileLayout({
  topBarHeight = 60,
  screenSize = "sm",
}: MobileLayoutProps = {}): React.JSX.Element {
  const location = useLocation();
  console.log("Screen Size in MobileLayout:", screenSize);
  const styles: { [key: string]:React.CSSProperties } = {
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
