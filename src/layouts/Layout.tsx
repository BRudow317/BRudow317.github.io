import { useBreakpoint } from "../context/BreakpointContext";
import type { ScreenSize } from "../context/BreakpointContext";
import { MobileLayout } from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

// let topBarHeight = 60;

export const Layout = (): JSX.Element => {
  const screenSize: ScreenSize = useBreakpoint();
  console.log("Screen Size in Layout:", screenSize);
  const isMobile = screenSize === "xsm" || screenSize === "sm";

  return isMobile ? (
    <MobileLayout screenSize={screenSize} />
  ) : (
    <DesktopLayout screenSize={screenSize} />
  );
};
