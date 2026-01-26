import { useBreakpoint } from "../context/BreakpointContext";
import { MobileLayout } from "./MobileLayout";
import { DesktopLayout } from "./DesktopLayout";

let topBarHeight = 60;

export const Layout = () => {
  const screenSize = useBreakpoint();
  const isMobile = screenSize === "xs" || screenSize === "sm";

  return isMobile ? <MobileLayout topBarHeight={topBarHeight} /> : <DesktopLayout topBarHeight={topBarHeight} />;
};
