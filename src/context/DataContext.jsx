/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
export { DataProvider, useData };

const DataContext = createContext(undefined);

function DataDomSync({ dataContext }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-context", dataContext);
  }, [dataContext]);

  return null;
}

function DataProvider({ children }) {
  const [dataContext, setDataContext] = useState("software_engineer");

  // Memoize the context value to optimize performance
  const value = useMemo(() => ({
    dataContext,
    setDataContext,
  }), [dataContext]);

  return (
    <DataContext.Provider value={value}>
      <DataDomSync dataContext={dataContext} />
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
