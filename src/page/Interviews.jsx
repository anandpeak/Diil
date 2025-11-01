import React, { useRef, useState } from "react";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa6";
import data from "../json/interviews.json";
import { motion, useMotionValue } from "framer-motion";
import { MdOutlineRefresh } from "react-icons/md";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

const Interviews = () => {
  const [showFilter, setShowFilter] = useState(false);
  const y = useMotionValue(0);
  const drawerRef = useRef(null);

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) setShowFilter(false);
    else setShowFilter(true);
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
    if (salary.includes("-")) {
      const [min, max] = salary.split("-").map(Number);
      return `${formatSingleSalary(min)} - ${formatSingleSalary(max)}`;
    } else {
      return formatSingleSalary(Number(salary));
    }
  }

  function formatSingleSalary(value) {
    if (value >= 1_000_000) {
      const val = (value / 1_000_000).toFixed(1);
      return val.endsWith(".0") ? `${parseInt(val)} сая ₮` : `${val} сая ₮`;
    } else if (value >= 1000) {
      const val = (value / 1000).toFixed(0);
      return `${val} мянга ₮`;
    }

    return `${value} ₮`;
  }

  return (
    <div className="md:p-6 p-0 relative">
      {/* datas */}
      <div className="md:flex hidden items-center gap-3 mb-6 justify-between overflow-x-scroll scrollbar-hide">
        <div className=" lg:h-[149px] lg:flex-1 w-[200px] h-[165px] flex-shrink-0 bg-[#F1F5F9] rounded-[24px] p-4 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fff]">
              <img src="/icon/inter/total.svg" alt="icon" />
            </div>
            <button className="text-[#020618]">
              <FaChevronRight />
            </button>
          </div>
          <div>
            <p className="text-[#020618] font-bold">13 Нийт</p>
            <p className="text-[#62748E] text-xs">
              Таны нийт ярилцлага хйисэн компаниудын тоо
            </p>
          </div>
        </div>
        <div className=" lg:h-[149px] lg:flex-1 w-[200px] h-[165px] flex-shrink-0 bg-[#F1F5F9] rounded-[24px] p-4 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fff]">
              <img src="/icon/inter/inter.svg" alt="icon" />
            </div>
            <button className="text-[#020618]">
              <FaChevronRight />
            </button>
          </div>
          <div>
            <p className="text-[#020618] font-bold">10 Ярилцлага</p>
            <p className="text-[#62748E] text-xs">
              Зөвхөн таны ярилцсан хйисэн компаниудын тоо
            </p>
          </div>
        </div>
        <div className=" lg:h-[149px] lg:flex-1 w-[200px] h-[165px] flex-shrink-0 bg-[#F1F5F9] rounded-[24px] p-4 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fff]">
              <img src="/icon/inter/ai.svg" alt="icon" />
            </div>
            <button className="text-[#020618]">
              <FaChevronRight />
            </button>
          </div>
          <div>
            <p className="text-[#020618] font-bold">3 AI-н ярилцлага</p>
            <p className="text-[#62748E] text-xs">
              Таны өмнөөс хийсэн ярилцлагууд
            </p>
          </div>
        </div>
        <div className=" lg:h-[149px] lg:flex-1 w-[200px] h-[165px] flex-shrink-0 bg-[#F1F5F9] rounded-[24px] p-4 space-y-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fff]">
              <img src="/icon/inter/ready.svg" alt="icon" />
            </div>
            <button className="text-[#020618]">
              <FaChevronRight />
            </button>
          </div>
          <div>
            <p className="text-[#020618] font-bold">4 Сонирхосон</p>
            <p className="text-[#62748E] text-xs">
              Таныг ажилд авах сонирхолтой компаниудын тоо
            </p>
          </div>
        </div>

        <div className="relative  lg:h-[149px] lg:flex-1 w-[200px] h-[165px] flex-shrink-0 rounded-[24px] p-0.5  bg-[linear-gradient(40deg,#4342FF,#FF6829)] bg-opacity-10">
          <div className="relative rounded-[22px] bg-[#F1F5F9] w-full h-full p-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4342FF] to-[#FF6829] opacity-10"></div>
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fff]">
                  <img src="/icon/inter/ready.svg" alt="icon" />
                </div>
                <button className="text-[#020618]">
                  <FaChevronRight />
                </button>
              </div>
              <div>
                <p className="text-[#020618] font-bold">4 Бэлэн</p>
                <p className="text-[#62748E] text-xs">
                  Таныг шууд ажилд авахад бэлэн компаниудын тоо
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* table*/}
      <div className="mt-6 md:block hidden">
        <p className="text-[24px] font-bold text-[#020618] mb-6">Ярилцлагууд</p>

        <div className="overflow-x-auto overflow-y-hidden rounded-[16px] border border-[#E5E7EB]">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="border-b bg-[#F8FAFC] px-3">
                <th className="py-2">
                  <button className="text-[#020618] flex items-center gap-1 py-2.5 pe-3 ps-4 font-normal">
                    Компаниуд
                    <FaChevronDown />
                  </button>
                </th>
                <th className="py-2">
                  <button className="text-[#020618] flex items-center gap-1 py-2.5 pe-3 ps-4 font-normal">
                    Бүгд
                    <FaChevronDown />
                  </button>
                </th>
                <th className="py-2">
                  <button className="text-[#020618] flex items-center gap-1 py-2.5 pe-3 ps-4 font-normal">
                    Бүгд
                    <FaChevronDown />
                  </button>
                </th>

                {/* Last 3 columns hidden below lg */}
                <th className="py-2 lg:table-cell hidden">
                  <button className="text-[#020618] flex items-center gap-1 py-2.5 pe-3 ps-4 font-normal">
                    Шинэ → Өмнөх
                    <img src="/icon/ascendant.svg" alt="icon" />
                  </button>
                </th>
                <th className="py-2 lg:table-cell hidden">
                  <button className="text-[#020618] flex items-center gap-1 py-2.5 pe-3 ps-4 font-normal">
                    Асуултууд
                  </button>
                </th>
                <th className="py-2 lg:table-cell hidden">
                  <button className="text-[#020618] flex items-center gap-1 py-2.5 pe-3 ps-4 font-normal">
                    Хариултууд
                  </button>
                </th>

                {/* New column for button */}
                <th className="py-2">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 last:rounded-b-[16px] group"
                >
                  <td className="py-3 ps-3 flex items-center gap-2 min-w-[250px]">
                    <div className="w-9 h-9 rounded-full border">
                      <img
                        src={item.logo}
                        alt={item.companyName}
                        className="w-full h-full rounded-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-[#020618] font-bold w-[150px] truncate">
                        {item.jobName}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-[#62748E] truncate max-w-[50px]">
                          {item.companyName}
                        </p>
                        <p className="text-sm text-[#62748E] max-w-[80px] truncate">
                          {getTimeAgo(item.date)}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#020618] font-bold text-sm">
                      {formatSalary(item.salary)}
                    </p>
                  </td>

                  <td className="py-2 px-3 min-w-[120px]">
                    <div className="inline-block text-[#020618] text-sm py-1 px-2 rounded-[99px] border border-[#CAD5E2]">
                      {item.interview === "me"
                        ? "Би өөрөө ярилцсан"
                        : item.interview === "ai"
                        ? "AI Ярилцсан"
                        : "Ярилцаагүй"}
                    </div>
                  </td>
                  <td className="py-2 px-3 min-w-[120px]">
                    <div className="inline-block text-[#020618] text-sm py-1 px-2 rounded-[99px] border border-[#CAD5E2]">
                      {item.isInterested
                        ? "Намайг сонирхосон"
                        : "Намайг сонирхоогүй"}
                    </div>
                  </td>

                  {/* Last 3 columns hidden below lg */}
                  <td className="py-2 px-3 lg:table-cell hidden min-w-[100px]">
                    <div className="inline-block text-[#020618] text-sm py-1 px-2 rounded-[99px] border border-[#CAD5E2]">
                      {item.isNew}
                    </div>
                  </td>
                  <td className="py-2 px-3 lg:table-cell hidden min-w-[100px]">
                    <div className="inline-block text-[#020618] text-sm py-1 px-2 rounded-[99px] border border-[#CAD5E2]">
                      {item.questionNumber}
                    </div>
                  </td>
                  <td className="py-2 px-3 lg:table-cell hidden min-w-[100px]">
                    <div className="inline-block text-[#020618] text-sm py-1 px-2 rounded-[99px] border border-[#CAD5E2]">
                      {item.answerNumber}
                    </div>
                  </td>

                  {/* New column with right arrow button */}
                  <td className="py-2 px-3 text-center min-w-[40px]">
                    <button
                      className="text-[#020618] hover:text-[#020618] border-2 border-transparent group-hover:border-[#E2E8F0] bg-[#fff] w-8 h-8 text-base rounded-full flex items-center justify-center"
                      group
                    >
                      <FaChevronRight />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* phone */}

      <div className="md:hidden flex flex-col px-4 pt-6 pb-3 ">
        <div className="flex items-center justify-between mb-4">
          <p className=" text-base font-bold text-[#020618]">Ярилцлагууд</p>
        </div>

        {/* filter */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => {
              setShowFilter(true);
            }}
            className="text-[#020618] border border-[#CAD5E2] py-2 pe-3 ps-3.5 rounded-[999px] flex items-center gap-2 text-sm"
          >
            Шүүлтүүр нэмэх
            <div className="w-5 h-5 rounded-full bg-[#F1F5F9] flex items-center justify-center">
              <FaPlus />
            </div>
          </button>

          <button className="text-[#020618] border border-[#CAD5E2] w-[38px] h-[38px] rounded-full flex items-center justify-center">
            <img src="/icon/ascendant.svg" alt="icon" />
          </button>
        </div>
      </div>

      {/* phone table */}
      <div className="md:hidden block h-[70vh] overflow-y-scroll scrollbar-hidden">
        {data.map((item, index) => (
          <div key={index} className="border-b border-[#CAD5E2] p-4">
            <div className="flex  items-start gap-2 justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full border flex items-center justify-center">
                  <img src={item.logo} alt="logo" />
                </div>
                <p className="text-sm text-[#62748E] w-[50vw] truncate">
                  {item.companyName}
                  ajhb
                </p>
              </div>
              <button className="flex items-center gap-2 text-[#020618] text-xs">
                {item.isNew} <FaChevronRight />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-[#020618] font-bold max-w-[45vw] truncate">
                {item.jobName}
              </p>
              <p className="text-[#020618] text-sm">
                {formatSalary(item.salary)}
              </p>
            </div>
            <div className="bg-[#F1F5F9] p-3 rounded-[16px] flex flex-wrap gap-1">
              <p className="text-xs text-[#020618] me-2">
                <span className="text-[#62748E]">#</span>
                {item.interview === "me"
                  ? "Би өөрөө ярилцсан"
                  : item.interview === "ai"
                  ? "AI Ярилцсан"
                  : "Ярилцаагүй"}
              </p>
              <p className="text-xs text-[#020618] me-2">
                <span className="text-[#62748E]">#</span>
                {item.isInterested ? "Намайг сонирхосон" : "Намайг сонирхоогүй"}
              </p>
              <p className="text-xs text-[#020618] me-2">
                <span className="text-[#62748E]">#</span>
                {item.isInterested ? "Намайг сонирхосон" : "Намайг сонирхоогүй"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* drawer */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/40 backdrop:blur-sm z-30"
          onClick={() => {
            setShowFilter(false);
          }}
        ></div>
      )}
      <motion.div
        ref={drawerRef}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{ y }}
        onDragEnd={handleDragEnd}
        animate={{ y: showFilter ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl px-4 pt-4 pb-12 z-40 shadow-xl"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

        <div className="flex items-center justify-between mb-4">
          <button className="p-2.5 rounded-full border border-[#CAD5E2] ">
            <MdOutlineRefresh />
          </button>
          <p className="text-[#020618] font-bold">Шүүлтүүр нэмэх</p>
          <button
            onClick={() => {
              setShowFilter(false);
            }}
            className="p-2.5 rounded-full border border-[#CAD5E2] "
          >
            <IoMdClose />
          </button>
        </div>
        <div className="space-y-2 w-full">
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Компаниуд
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Ярилцлага
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Таныг сонирхосон
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Таныг сонирхосон
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Асуултууд
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Хариултууд
            <IoIosArrowDown />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Interviews;
