// BreakpointContext.js
import { createContext, useState, useEffect, useContext } from "react";

export {BreakpointContext, BreakpointProvider, getScreenSize, useBreakpoint};

const BreakpointContext = createContext();

const getScreenSize = () => {
  if (window.matchMedia("(width < 480px)").matches) return "xsm";
  else if (window.matchMedia("(480px < width <= 720px)").matches) return "sm";
  else if (window.matchMedia("(720px < width <= 960px)").matches) return "md";
  else if (window.matchMedia("(960px < width <= 1200px)").matches) return "lg";
  else if (window.matchMedia("(1200px < width <= 1600px)").matches) return "xl";
  else if (window.matchMedia("(width > 1600px)").matches) return "xxl";
  else return "unknown";
};

function BreakpointProvider({ children }) {

  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handler = () => setScreenSize(getScreenSize());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <BreakpointContext.Provider value={screenSize}>
      {children}
    </BreakpointContext.Provider>
  );
};

function useBreakpoint() {
  return useContext(BreakpointContext);
}