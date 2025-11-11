import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { useSidebar } from "../context/SidebarContext";

const Layout = () => {
  const { sidebar, setSidebar } = useSidebar();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // phone/tablet
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine if header should be hidden or not fixed
  const hideHeader = isMobile && location.pathname.startsWith("/chat");
  const isChatPage = location.pathname.startsWith("/chat");

  return (
    <div className="flex w-full overflow-hidden min-h-[calc(var(--vh,1vh)*100)]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed left-0 top-0 h-screen transition-all duration-100 z-40 ${
          sidebar ? "w-[14.75rem]" : "w-[5rem]"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed top-0 h-screen transition-transform duration-100 z-50
          ${sidebar ? "translate-x-0" : "translate-x-full"}
          ${isMobile ? "w-full" : "w-[14.75rem]"}
          right-0
        `}
      >
        <Sidebar />
      </aside>

      {/* Overlay for mobile/tablet */}
      {sidebar && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 w-full transition-all duration-300 ${
          sidebar ? "lg:ml-[14.75rem]" : "lg:ml-[5rem]"
        }`}
      >
        {/* Header — never fixed on chat pages */}
        {!hideHeader && (
          <div
            className={`w-full ${
              isScrolled && !isChatPage
                ? `fixed top-0 z-30 md:border-b border-[#CAD5E2] ${
                    sidebar
                      ? "lg:w-[calc(100%-14.75rem)]"
                      : "lg:w-[calc(100%-5rem)]"
                  }`
                : "relative w-full"
            }`}
          >
            <Header />
          </div>
        )}

        <main
          className={`${
            isScrolled && !isChatPage ? "pt-[var(--header-height,4rem)]" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
