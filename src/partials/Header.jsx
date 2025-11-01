import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { RxDoubleArrowRight } from "react-icons/rx";
import { FiArrowUpRight, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ExpandingSearch() {
  return (
    <div className="flex items-center ">
      <div className="relative group">
        <div className="flex items-center bg-[#F1F5F9] rounded-full transition-all duration-300 md:w-[20rem] flex-1 h-[3rem] md:group-hover:w-[26.25rem] p-1">
          <div className="flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-[#fff] rounded-full cursor-pointer ">
            <svg
              className="w-[1.5rem] h-[1.5rem] text-[#020618]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Хайх"
            className="flex-1 bg-transparent outline-none text-[#020618] px-3 text-center md:text-[16px] text-sm w-[80%]"
          />
          <div className="flex items-center justify-center w-[2.5rem] h-[2.5rem] opacity-0asdf rounded-full cursor-pointer "></div>
        </div>
      </div>
    </div>
  );
}

const Header = () => {
  const { sidebar, setSidebar } = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="h-[4rem] flex items-center justify-between py-3 md:ps-2 md:pe-6 pe-2 border-b lg:border-transparent border-[#CAD5E2] bg-[#fff]">
      <button
        onClick={() => setSidebar(!sidebar)}
        disabled={sidebar}
        className={`w-[40px] h-[40px] p-2 rounded-full border-[3px] border-transparent hover:border-[#E2E8F0] lg:flex hidden items-center justify-center transition-all duration-300 ${
          sidebar && "opacity-0"
        }`}
      >
        <RxDoubleArrowRight className="text-[24px]" />
      </button>
      <img
        onClick={() => {
          navigate("/");
        }}
        className="lg:hidden md:block hidden cursor-pointer"
        src="/img/logo/logo.svg"
        alt="logo"
      />
      <img
        onClick={() => {
          navigate("/");
        }}
        className="md:hidden block cursor-pointer"
        src="/img/logo/logoc.svg"
        alt="logo"
      />
      <ExpandingSearch />
      <button className="group py-1 pe-1 ps-6 gap-3 lg:flex hidden items-center bg-[#020618] rounded-[99px] text-[#fff] hover:bg-[#29EAFF] hover:text-[#0F172B]">
        CV Бүтээх
        <div className="bg-[#1D293D] h-[40px] w-[40px] rounded-full flex items-center justify-center ">
          <FiArrowUpRight className="text-[24px] group-hover:text-[#29EAFF]" />
        </div>
      </button>
      <div className="flex lg:hidden items-center gap-2">
        {" "}
        <button className="flex items-center justify-center rounded-full border-2 border-transparent hover:border-[#E2E8F0] w-10 h-10">
          <img src="/icon/user.svg" alt="user" />
        </button>
        <button
          onClick={() => setSidebar(!sidebar)}
          className="flex items-center justify-center rounded-full border-2 border-transparent hover:border-[#E2E8F0] w-10 h-10"
        >
          <img src="/icon/menu.svg" alt="menu" />
        </button>
      </div>
    </div>
  );
};

export default Header;
