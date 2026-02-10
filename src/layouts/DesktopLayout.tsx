import { SideNav } from "../components/ui/SideNav";
import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "../components/ui/TopBar";
import { Footer } from "../components/ui/Footer";
import type { ScreenSize } from "../context/BreakpointContext";
import React from "react";

type DesktopLayoutProps = {
  topBarHeight?: number;
  screenSize?: ScreenSize;
};

export function DesktopLayout({
  topBarHeight = 60,
  screenSize = "lg",
}: DesktopLayoutProps = {}): React.JSX.Element {
  const location = useLocation();

  const styles: { [key: string]:React.CSSProperties } = {
    App: {
      display: "flex",
      flexDirection: "row",
      minHeight: "100dvh",
    //   minWidth: "100dvw",
      width: "100%",
      height: "100%",
    },
    Main: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      flex: 1,
      minHeight: "100dvh",
    },
    Content: {
      padding: "18px",
      width: "100%",
      flex: 1,
      // borderTop: "2px solid var(--border-1)",
      // borderLeft: "2px solid var(--border-1)",
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
          <Footer />
        </main>
      </div>
    );
}
