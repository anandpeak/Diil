import React from "react";
import { useNavigate } from "react-router-dom";
import data from "../../json/games.json";
import { IoPlayOutline } from "react-icons/io5";
import news from "../../json/news.json";
import { PiWarningOctagon } from "react-icons/pi";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa6";

const Games = () => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let dayText = "";
    if (diffDays === 0) dayText = "Өнөөдөр";
    else if (diffDays === 1) dayText = "Өчигдөр";
    else dayText = `${diffDays} хоногийн өмнө`;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayText} - ${month}/${day} ${year}`;
  };

  return (
    <div className="p-4 w-10/12 mb-10">
      <div className="md:overflow-x-scroll  scrollbar-hide w-full md:flex md:space-y-0 space-y-2.5  lg:flex-nowrap md:flex-wrap block items-center gap-3 md:px-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`lg:w-[293px] md:w-[47%] w-full lg:h-[393px] md:h-[477px] h-[223px] bg-[#F1F5F9] rounded-[16px] p-2 flex-shrink-0 md:block flex md:gap-0 gap-3`}
          >
            <div className="md:w-full w-[48%] lg:h-[292px] md:h-[376px] h-[210px] rounded-[8px] overflow-hidden flex-shrink-0">
              <img
                className="object-cover h-full w-full"
                src={item.gameImage}
                alt="aaa"
              />
            </div>

            <div className="md:pt-5 pt-8 flex md:flex-row flex-col items-center justify-between gap-2 md:w-full w-[47%]">
              <div className="md:w-[70%]">
                <p className="text-[#020618] font-bold truncate w-[153px] md:text-base text-sm">
                  {item.GameName}
                </p>
                <p className="text-xs text-[#62748E] md:line-clamp-2 line-clamp-4">
                  {item.description}
                </p>
              </div>
              <button
                onClick={() => {
                  if (item.GameName.toLowerCase().includes("arrow")) {
                    navigate("/games/arrow");
                  }
                }}
                className="w-10 h-10 rounded-full bg-[#1D293D] border-2 border-[#020618]  items-center justify-center text-[#fff] hidden md:flex hover:bg-[#29EAFF] transition-all duration-300 cursor-pointer"
              >
                <IoPlayOutline />
              </button>
              <button
                onClick={() => {
                  if (item.GameName.toLowerCase().includes("arrow")) {
                    navigate("/games/arrow");
                  }
                }}
                className="md:hidden flex items-center gap-2 py-1 ps-6 pe-1 bg-[#020618] hover:bg-[#29EAFF] rounded-[99px] transition-all duration-300 group cursor-pointer"
              >
                <p className="text-[#fff] transition-colors duration-300 group-hover:text-[#0F172B]">
                  Тоглох
                </p>
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#1D293D] ">
                  <IoPlayOutline className="text-[#fff] text-xl group-hover:text-[#29EAFF] duration-300 transition-colors" />
                </div>
              </button>
            </div>
          </div>
        ))}

        {/* Last Card */}
        <div className="lg:w-[293px] md:w-[47%] lg:h-[393px] md:h-[477px] md:bg-[#F1F5F9] bg-[#fff] rounded-[16px] flex-shrink-0 flex items-center justify-center lg:mr-[220px] border md:border-transparent border-[#CAD5E2] md:py-0 py-11">
          <div>
            <p className="text-center text-[#020618] font-bold">
              Тун удахгүй...
            </p>
            <p className="text-xs text-[#62748E]">Шинэ тоглоомнууд нэмэгдэнэ</p>
          </div>
        </div>
      </div>
      <div className="md:pt-12 pt-6 md:px-9 px-4">
        <p className="text-[#020618 font-bold mb-4">Мэдээ</p>
        <div className="md:flex block flex-wrap items-center lg:gap-8 gap-6 md:space-y-0 space-y-10">
          {news.map((item, index) => (
            <div key={index} className="lg:w-[283px] md:w-[47%] w-full mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F1F5F9] rounded-full">
                {item.type === "warning" ? (
                  <PiWarningOctagon />
                ) : item.type === "news" ? (
                  <LuFileSpreadsheet />
                ) : (
                  <FaRegStar />
                )}
              </div>
              <p className="pt-4 text-[#020618] line-clamp-3">{item.news}</p>
              <p className="pt-2 text-[#62748E] text-xs">
                {formatDate(item.date)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Games;
