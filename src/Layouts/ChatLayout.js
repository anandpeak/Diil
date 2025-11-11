import { useState, useEffect } from "react";
import ChatSidebar from "../partials/chat/ChatSidebar";
import ChatHeader from "../partials/chat/ChatHeader";
import ChatInfo from "../partials/chat/ChatInfo";
import { Outlet } from "react-router-dom";
import defaultChats from "../json/chaters.json";

export default function ChatLayout() {
  const chats = defaultChats;
  const [chatId, setChatId] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [activePage, setActivePage] = useState("chat"); // "chat" or "info"

  const currentChat = chats.find((c) => c.id === chatId);

  // Track screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // tablet or lower
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex   md:h-[calc(100vh-4rem)] h-[calc(var(--vh,1vh)*100)]">
      {/* Sidebar */}
      {!isMobile && (
        <ChatSidebar chats={chats} chatId={chatId} setChatId={setChatId} />
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 relative ">
        <ChatHeader currentChat={currentChat} />

        {/* Mobile toggle buttons */}
        {isMobile && (
          <div className="relative">
            <div
              className={`absolute top-0 left-0 z-10 w-full flex justify-center gap-2  py-2 px-2 `}
            >
              <button
                className={`w-[45%] md:py-2 py-1.5 rounded-full bg-white border md:text-base text-sm ${
                  activePage === "chat"
                    ? "border-[#020618]"
                    : "border-[#CAD5E2]"
                }`}
                onClick={() => setActivePage("chat")}
              >
                Ярилцлага
              </button>
              <button
                className={`w-[45%] md:py-2 py-1.5 rounded-full bg-white border md:text-base text-sm ${
                  activePage === "info"
                    ? "border-[#020618]"
                    : "border-[#CAD5E2]"
                }`}
                onClick={() => setActivePage("info")}
              >
                Зарын мэдээлэл
              </button>
            </div>
          </div>
        )}

        {/* Content area */}
        {isMobile ? (
          <div className="flex-1 overflow-y-auto">
            {activePage === "chat" ? (
              <Outlet context={{ currentChat }} />
            ) : (
              <ChatInfo currentChat={currentChat} />
            )}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <Outlet context={{ currentChat }} />
          </div>
        )}
      </div>

      {/* Chat info on large screens */}
      {!isMobile && <ChatInfo currentChat={currentChat} />}
    </div>
  );
}
