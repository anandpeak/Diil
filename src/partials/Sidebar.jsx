import React, { useEffect, useState } from "react";
import { RxDoubleArrowLeft, RxEnvelopeClosed } from "react-icons/rx";
import sidebars from "../json/sidebar.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { PiWarningOctagon } from "react-icons/pi";

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { sidebar, setSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const current = sidebars.find((item) => location.pathname === item.link);
    if (current) {
      setSelectedMenu(current.id);
    }

    if (window.innerWidth < 768) {
      setSidebar(false);
    }
  }, [location.pathname]);

  return (
    <div
      className={`px-[16px] py-[20px] border-r border-[#CAD5E2] h-screen flex flex-col justify-between  bg-[#fff]
    ${sidebar ? "sm:w-[14.75rem] w-full" : "w-[5rem] sm:w-[5rem]"}
  `}
    >
      <div className="flex flex-col gap-[32px]">
        <div className="flex items-center justify-between">
          {sidebar ? (
            <img
              onClick={() => {
                navigate("/");
              }}
              src="/img/logo/logo.svg"
              alt="logo"
              className={`transition-opacity duration-100 cursor-pointer `}
            />
          ) : (
            <img
              onClick={() => {
                navigate("/");
              }}
              src="/img/logo/logoc.svg"
              alt="logo"
              className={`transition-opacity duration-100 cursor-pointer`}
            />
          )}
          <button
            onClick={() => setSidebar(!sidebar)}
            className={`w-[40px] h-[40px] p-2 rounded-full border-[3px] border-transparent hover:border-[#E2E8F0] flex items-center justify-center transition-all duration-300 ${
              !sidebar && "hidden"
            }`}
          >
            <RxDoubleArrowLeft className="text-[24px] md:rotate-180 lg:rotate-0" />
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              navigate("/chat");
            }}
            className={`w-full flex items-center text-[#fff] hover:text-[#0F172B] hover:bg-[#29EAFF] bg-[#020618] rounded-[99px] p-1.5 transition-all duration-300 group ${
              sidebar ? "gap-2" : "justify-center"
            }`}
          >
            <div className="flex items-center justify-center bg-[#1D293D] group-hover:bg-[#0F172B] rounded-full p-2 transition-all duration-300 text-center">
              <img
                src="/icon/voice.svg"
                alt="icon"
                className="group-hover:hidden"
              />
              <img
                src="/icon/voiceh.svg"
                alt="icon"
                className="hidden group-hover:block"
              />
            </div>
            {sidebar && (
              <p className="text-center md:w-auto w-full md:me-0 me-14">
                Ярилцлага өгөх
              </p>
            )}
          </button>
        </div>

        <div className="flex flex-col">
          {sidebars.map((item, index) => (
            <div
              onClick={() => {
                setSelectedMenu(item.id);
                navigate(item.link);
              }}
              key={index}
              className={`w-full p-1 flex items-center hover:bg-[#E2E8F0] transition-all duration-300 rounded-[999px] cursor-pointer ${
                sidebar ? "gap-2" : "justify-center"
              }`}
            >
              <img
                src={selectedMenu === item.id ? item.selectedImg : item.img}
                alt="icon"
              />
              {sidebar && (
                <p
                  className={`text-[#020618] whitespace-nowrap ${
                    selectedMenu === item.id && "font-bold"
                  }`}
                >
                  {item.name.mn}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {sidebar ? (
        <div>
          {/* Contact */}
          <div
            onClick={() => navigate("/contact")}
            className={`w-full p-1 flex items-center hover:bg-[#E2E8F0]duration- rounded-[999px] cursor-pointer ${
              sidebar ? "gap-2" : "justify-center"
            }`}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-transparent bg-[#fff]">
              <RxEnvelopeClosed size={20} />
            </div>
            <p className="text-[#020618] whitespace-nowrap">Холбогдох</p>
          </div>

          {/* Feedback */}
          <div
            onClick={() => navigate("/feedback")}
            className={`w-full p-1 flex items-center hover:bg-[#E2E8F0]duration- rounded-[999px] cursor-pointer ${
              sidebar ? "gap-2" : "justify-center"
            }`}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-transparent bg-[#fff]">
              <PiWarningOctagon size={20} />
            </div>
            <p className="text-[#020618] whitespace-nowrap">Санал хүсэлт</p>
          </div>
        </div>
      ) : (
        <div>
          {/* Contact (icon only) */}
          <div
            onClick={() => {
              navigate("/contact");
            }}
            className={` p-1 flex items-center hover:bg-[#E2E8F0]duration- rounded-[999px] cursor-pointer w-[47px] h-[47px] ${
              sidebar ? "gap-2" : "justify-center"
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-transparent bg-[#fff]">
              <RxEnvelopeClosed size={20} />
            </div>
          </div>

          {/* Feedback (icon only) */}
          <div
            onClick={() => {
              navigate("/feedback");
            }}
            className={` p-1 flex items-center hover:bg-[#E2E8F0]duration- rounded-[999px] cursor-pointer w-[47px] h-[47px] ${
              sidebar ? "gap-2" : "justify-center"
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-transparent bg-[#fff]">
              <PiWarningOctagon size={20} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
