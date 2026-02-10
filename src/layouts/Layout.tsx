import { useBreakpoint } from "../context/BreakpointContext";
import type { ScreenSize } from "../context/BreakpointContext";
import { MobileLayout } from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";
import React from "react";

export const Layout = (): React.JSX.Element => {
  const screenSize: ScreenSize = useBreakpoint();
  console.log("Screen Size in Layout:", screenSize);
  const isMobile = screenSize === "xsm" || screenSize === "sm";

  return isMobile ? (
    <MobileLayout screenSize={screenSize} />
  ) : (
    <DesktopLayout screenSize={screenSize} />
  );
};
