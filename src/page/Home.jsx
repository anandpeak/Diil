import React, { useState, useEffect, useRef } from "react";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoMdHeart,
  IoMdHeartEmpty,
} from "react-icons/io";
import works from "../json/workplaces.json";
import jobs from "../json/specialoffers.json";
import SpecialOffer from "../components/home/SpecialOffer";
import { CgOptions } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const EyeIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LikeButton = ({ initialLiked }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  return (
    <button
      className="rounded-full h-10 w-10 flex items-center justify-center bg-[#fff]"
      onClick={() => setIsLiked((prev) => !prev)}
    >
      {isLiked ? (
        <IoMdHeart className="text-red-500 lg:text-base" />
      ) : (
        <IoMdHeartEmpty className="text-[#020618] lg:text-base" />
      )}
    </button>
  );
};

const Home = () => {
  const [sortedWorks, setSortedWorks] = useState(works);
  const [isAscending, setIsAscending] = useState(true);
  const [filter, setFilter] = useState("date");
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 10;
  const containerRef = useRef(null);

  const [displayedWorks, setDisplayedWorks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let sorted = [...works];

    if (filter === "date") {
      sorted.sort((a, b) => {
        const dateA = new Date(a.createdDate);
        const dateB = new Date(b.createdDate);
        return isAscending ? dateB - dateA : dateA - dateB;
      });
    }

    if (filter === "salary") {
      sorted.sort((a, b) => {
        const salaryA = Number(a.salary);
        const salaryB = Number(b.salary);
        return isAscending ? salaryB - salaryA : salaryA - salaryB;
      });
    }

    setSortedWorks(sorted);
  }, [filter, isAscending]);

  useEffect(() => {
    const initialWorks = sortedWorks.slice(0, ITEMS_PER_PAGE);
    setDisplayedWorks(initialWorks);
  }, [sortedWorks]);

  const handleScroll = () => {
    if (!containerRef.current || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadMore();
    }
  };

  const loadMore = () => {
    setLoading(true);
    const nextPage = page + 1;
    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const end = nextPage * ITEMS_PER_PAGE;

    const moreWorks = sortedWorks.slice(start, end);

    if (moreWorks.length > 0) {
      setDisplayedWorks((prev) => [...prev, ...moreWorks]);
      setPage(nextPage);
    }

    setLoading(false);
  };

  const handleClick = () => {
    setIsAscending((prev) => !prev);

    const sorted = [...sortedWorks].sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);

      return isAscending ? dateB - dateA : dateA - dateB;
    });

    setSortedWorks(sorted);
    setFilter("date");
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    if (diffYear > 0) {
      return `${diffYear} жилийн өмнө`;
    } else if (diffMonth > 0) {
      return `${diffMonth} сарын өмнө`;
    } else if (diffWeek > 0) {
      return `${diffWeek} долоо хоногийн өмнө`;
    } else if (diffDay > 0) {
      return `${diffDay} өдрийн өмнө`;
    } else if (diffHour > 0) {
      return `${diffHour} цагийн өмнө`;
    } else if (diffMin > 0) {
      return `${diffMin} минутын өмнө`;
    } else {
      return "Дөнгөж сая";
    }
  };

  function formatSalary(salary) {
    if (salary >= 1_000_000) {
      const val = (salary / 1_000_000).toFixed(1);
      return val.endsWith(".0") ? `${parseInt(val)} сая ₮` : `${val} сая ₮`;
    } else if (salary >= 1000) {
      const val = (salary / 1000).toFixed(0);
      return `${val} мянга ₮`;
    }

    return `${salary} ₮`;
  }

  return (
    <div className="md:p-6 p-0">
      {/* Tablet and phone ontsgoi zar*/}
      <div className="lg:hidden md:block md:mb-8 mb-5 md:p-0 p-4">
        <h3 className="font-bold text-[#020618]">Онцгой зар</h3>

        {/* Scroll container */}
        <div className="md:flex md:items-center md:overflow-x-auto md:space-x-4 w-full mt-2 md:scrollbar-hide block md:space-y-0 space-y-3">
          {jobs.map((job, index) => (
            <SpecialOffer job={job} key={index} />
          ))}
        </div>
      </div>

      {/* filter */}
      <div className="flex items-center justify-between w-full  pb-4 lg:w-[72%] gap-2 md:pb-4 md:pt-0 md:px-0 p-4">
        {/* front 3 filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center md:gap-2.5 gap-2">
            <button
              onClick={() => setFilter("time")}
              className={`md:w-full md:flex-0 flex-1 text-[#020618] lg:px-4 lg:py-2 px-3 py-1.5 rounded-[999px] bg-[#fff] lg:text-base md:text-sm transition-all duration-300 ${
                filter === "time"
                  ? "md:border-1 border border-[#020618]"
                  : "md:border-1 border border-[#CAD5E2]"
              } hover:bg-[#E2E8F0]`}
            >
              Хугацаагаар
            </button>
            <button
              onClick={() => {
                setFilter("salary");
                setIsAscending((prev) => !prev);
              }}
              className={`w-full md:flex-0 flex-1 text-[#020618] lg:px-4 lg:py-2 px-3 py-1.5 rounded-[999px] bg-[#fff] lg:text-base md:text-sm transition-all duration-300 ${
                filter === "salary"
                  ? "md:border-1 border border-[#020618]"
                  : "md:border-1 border border-[#CAD5E2]"
              } hover:bg-[#E2E8F0]`}
            >
              Цалингаар
            </button>
          </div>

          <div className="md:block hidden h-4 w-[1px] bg-[#CAD5E2]" />
          <div className="md:flex hidden items-center md:gap-2.5 gap-2">
            <button
              onClick={() => {
                setFilter("activity");
              }}
              className={`text-[#020618] lg:px-4 lg:py-2 px-3 py-1.5 rounded-[999px] bg-[#fff] lg:text-base md:text-sm flex items-center gap-1.5 transition-all duration-300 ${
                filter === "activity"
                  ? "md:border-1 border border-[#020618]"
                  : "md:border-1 border border-[#CAD5E2]"
              } hover:bg-[#E2E8F0]`}
            >
              Үйл ажиллагаа <IoIosArrowDown className="text-[16px] mt-1" />
            </button>
            <button
              onClick={() => {
                setFilter("culture");
              }}
              className={`text-[#020618] lg:px-4 lg:py-2 md:px-3 md:py-1.5 rounded-[999px] bg-[#fff] lg:text-base md:text-sm flex items-center gap-1.5 transition-all duration-300 ${
                filter === "culture"
                  ? "md:border-1 border border-[#020618]"
                  : "md:border-1 border border-[#CAD5E2]"
              } hover:bg-[#E2E8F0]`}
            >
              Соёл <IoIosArrowDown className="text-[16px] mt-1" />
            </button>
          </div>
        </div>

        {/* last filters */}
        <div className="flex items-center md:gap-2.5 gap-2 ">
          <div className="md:block hidden h-4 w-[1px] bg-[#CAD5E2]" />
          <button
            onClick={handleClick}
            className={`text-[#020618] lg:px-4 lg:py-2 md:px-3 md:py-1.5 rounded-[999px] bg-[#fff] lg:text-base md:text-sm md:flex hidden items-center gap-1.5 transition-all duration-300 ${
              filter === "date"
                ? "md:border-1 border border-[#020618]"
                : "md:border-1 border border-[#CAD5E2]"
            } hover:bg-[#E2E8F0]`}
          >
            {isAscending ? "Шинэ → Хуучин" : "Шинэ ← Хуучин"}
          </button>
          <button
            onClick={() => {
              setFilter("options");
            }}
            className={`text-[#020618] rounded-full bg-[#fff] text-sm md:hidden flex items-center justify-center transition-all duration-300 w-[2.25rem] h-[2.25rem] ${
              filter === "options"
                ? "md:border-1 border border-[#020618]"
                : "md:border-1 border border-[#CAD5E2]"
            } hover:bg-[#E2E8F0]`}
          >
            <CgOptions />
          </button>
          <button
            onClick={handleClick}
            className={`text-[#020618] rounded-full bg-[#fff] text-sm md:hidden flex items-center justify-center transition-all duration-300 w-[2.25rem] h-[2.25rem] ${
              filter === "date"
                ? "md:border-1 border border-[#020618]"
                : "md:border-1 border border-[#CAD5E2]"
            } hover:bg-[#E2E8F0]`}
          >
            <img src="/icon/ascendant.svg" alt="icon" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:flex md:block gap-5  lg:h-[calc(100vh-11rem)]">
        {/* desktop tablet table */}
        <div className="lg:w-[72%] w-full md:flex hidden flex-col lg:h-full h-[70vh] lg:mb-0 md:mb-4">
          <div className="flex-1 border border-[#CAD5E2] rounded-[24px] overflow-y-auto scrollbar-hide">
            {sortedWorks.map((items, index) => {
              return (
                <div
                  key={index}
                  className="w-full py-4 ps-4 pe-2 gap-6 flex justify-between items-center cursor-pointer hover:bg-[#F1F5F9] group"
                  onClick={() => {
                    navigate("/chat");
                  }}
                >
                  <div className="flex items-center gap-[13px]">
                    <img
                      className="border rounded-full w-8 h-8"
                      src={items.logo}
                      alt="logo"
                    />
                    <div className="lg:w-[14.5rem] w-[16rem]">
                      <p className="font-bold text-[#020618] truncate">
                        {items.name}
                      </p>
                      <div className="flex items-center gap-3">
                        <p className="text-[#62748E] text-xs truncate max-w-[32%]">
                          {items.companyName}
                        </p>
                        <p className="text-[#62748E] text-xs">
                          {getTimeAgo(items.createdDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#62748E] text-xs w-[10.25rem] truncate hidden lg:block">
                    {items.location}
                  </p>
                  <p className="text-sm font-bold text-[#020618]">
                    {formatSalary(items.salary)}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Like button */}
                    <LikeButton initialLiked={items.isLiked} />

                    {/* Ярилцлага button */}
                    <button
                      className="group relative rounded-[99px] pe-1 ps-4 py-1 flex items-center gap-2 
                           bg-transparent text-[#020618] 
                           hover:bg-[#29EAFF] hover:text-[#0F172B]
                           group-hover:bg-[#020618] group-hover:text-white
                           transition-colors duration-300"
                    >
                      Ярилцлага
                      <div
                        className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center 
                          bg-transparent text-[#020618] 
                          group-hover:bg-[#1D293D] group-hover:text-white 
                          transition-colors duration-300"
                      >
                        <IoIosArrowForward className="text-sm" />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* phone table */}
        <div
          ref={containerRef}
          className="block md:hidden w-full overflow-y-auto scrollbar-hide"
          onScroll={handleScroll}
        >
          {displayedWorks.map((items, index) => (
            <div
              onClick={() => navigate("/chat")}
              className="p-4 border-b border-[#CAD5E2]"
              key={index}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-[#CAD5E2]">
                    <img
                      className="w-full h-full object-fill"
                      src={items.logo}
                      alt="logo"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#020618] max-w-[150px] truncate text-sm">
                      {items.name}
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-[#62748E] text-xs truncate max-w-[70px]">
                        {items.companyName}
                      </p>
                      <p className="text-[#62748E] text-xs truncate max-w-[70px]">
                        {getTimeAgo(items.createdDate)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center ">
                  <p className="text-[#020618] text-xs font-bold">
                    {formatSalary(items.salary)}
                  </p>
                  <LikeButton initialLiked={items.isLiked} />
                  <button
                    className="group relative rounded-[99px] pe-1 ps-1 py-1 flex items-center gap-2 
                         bg-[#E2E8F0]
                         hover:bg-[#020618] 
                         group-hover:bg-[#020618] group-hover:text-white
                         transition-colors duration-300"
                  >
                    <div
                      className="w-[2rem] h-[2rem] rounded-full flex items-center justify-center 
                      bg-[#fff]
                      group-hover:bg-[#1D293D] group-hover:text-white 
                      transition-colors duration-300"
                    >
                      <IoIosArrowForward className="text-sm" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-center my-2 text-gray-500">Loading...</p>
          )}
        </div>

        {/* desktop left side */}
        <div className="lg:w-[28%] w-full md:flex hidden flex-col h-full ">
          <div className="flex-1">
            <div className="flex lg:flex-col md:flex-row md:gap-[14px] lg:gap-4 lg:h-auto md:h-[211px] lg:mb-4 md:mb-0">
              {/* Top Two Cards */}
              <div className="flex items-stretch justify-between lg:gap-2.5 md:gap-[14px]">
                {/* Card 1 */}
                <div className="bg-[#F1F5F9] rounded-[24px] p-4 gap-6 w-[50%] flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-[#fff] rounded-full flex items-center justify-center">
                      <EyeIcon className="text-[24px]" />
                    </div>
                    <IoIosArrowForward className="text-[18px] cursor-pointer" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#020618] mb-2">0 Үзэлт</h2>
                    <p className="text-[#62748E] text-xs">
                      Таныг сонирхсон компаниуд
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#F1F5F9] rounded-[24px] p-4 gap-6 w-[50%] flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-[#fff] rounded-full flex items-center justify-center">
                      <EyeIcon className="text-[24px]" />
                    </div>
                    <IoIosArrowForward className="text-[18px] cursor-pointer" />
                  </div>
                  <div>
                    <h2 className="font-bold text-[#020618] mb-2">
                      0 Ярилцсан
                    </h2>
                    <p className="text-[#62748E] text-[11px]">
                      Work DNA тэй ярилцсан компаниуд
                    </p>
                  </div>
                </div>
              </div>

              {/* Top One Cards */}
              <div className="relative rounded-[16px] p-[3px] bg-[linear-gradient(40deg,#4342FF,#FF6829)] bg-opacity-10">
                <div className="relative rounded-[14px] bg-white p-3 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#4342FF] to-[#FF6829] opacity-10"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between lg:mb-6 mb-3">
                      <div className="w-10 h-10 bg-[#4258FF] flex items-center justify-center rounded-full">
                        <img src="/icon/star.svg" alt="star" />
                      </div>
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-[#E2E8F0]">
                        <IoIosArrowForward />
                      </div>
                    </div>
                    <h2 className="font-bold text-[#020618] lg:mb-3 md:mb-[9px]">
                      Work DNA Тодорхойлох
                    </h2>
                    <p className="text-[#020618] text-xs mb-6">
                      Таны ажилтны ялгарлыг тодорхойлж өмнөөс тань ажлын
                      ярилцлаганд ордог Work DNA
                    </p>
                    <button className="text-sm group py-1 pe-1 ps-6 gap-3 flex items-center bg-[#020618] rounded-[99px] text-[#fff] hover:bg-[#29EAFF] hover:text-[#0F172B] transition-all duration-300 lg:text-base md:text-md">
                      Эхлүүлэх
                      <div className="bg-[#1D293D] h-[32px] w-[32px] rounded-full flex items-center justify-center ">
                        <IoIosArrowForward className="text-[16px] group-hover:text-[#29EAFF] group-transition-all group-duration-300" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Title */}
            <div className="lg:block md:hidden">
              <h3 className="font-bold text-[#020618] ">Онцгой зар</h3>
              <div className="mt-2 space-y-4  overflow-y-scroll h-[190px] flex-1 scrollbar-hide">
                {jobs.map((job, index) => (
                  <SpecialOffer job={job} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
