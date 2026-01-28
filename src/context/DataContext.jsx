/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SITE_CONTEXT } from "../constants/SITE_CONTEXT.js";
export { DataProvider, useData };

const DataContext = createContext(undefined);
const DATA_THEMES = SITE_CONTEXT.map((context) => context.id);

function DataDomSync({ data_id }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-context", data_id);
  }, [data_id]);

  return null;
}

function DataProvider({ children }) {
  const [data_context, setData] = useState("default");

  const toggleData = () => {
    setData((curr) => {
      const index = DATA_THEMES.indexOf(curr);
      const nextIndex = index === -1 ? 0 : (index + 1) % DATA_THEMES.length;
      return DATA_THEMES[nextIndex];
    });
  };
  // Memoize the context value to optimize performance
  const value = useMemo(() => ({ data_context, toggleData }), [data_context]);

  return (
    <DataContext.Provider value={value}>
      <DataDomSync data_id={data_context} />
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
