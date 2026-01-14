/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
export { ThemeProvider, useTheme };

const ThemeContext = createContext(undefined);
const THEMES = ["my-theme", "dark", "light", "git"];

function ThemeDomSync({ theme }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => {
      const index = THEMES.indexOf(curr);
      const nextIndex = index === -1 ? 0 : (index + 1) % THEMES.length;
      return THEMES[nextIndex];
    });
  };
// Memoize the context value to optimize performance
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeDomSync theme={theme} />
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
