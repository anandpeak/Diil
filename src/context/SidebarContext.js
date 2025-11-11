import React, { createContext, useState, useContext, useEffect } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const savedSidebar = localStorage.getItem("diilSidebar");
    if (savedSidebar !== null) {
      setSidebar(savedSidebar === "true");
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        const saved = localStorage.getItem("diilSidebar");
        if (saved !== null) {
          setSidebar(saved === "true");
        } else {
          setSidebar(true);
        }
      } else {
        setSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("diilSidebar", sidebar);
  }, [sidebar]);

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
