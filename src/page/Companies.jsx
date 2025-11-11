import { useRef, useState } from "react";
import { FaChevronRight, FaPlus } from "react-icons/fa6";
import cat from "../json/categories.json";
import companiesData from "../json/companies.json";
import { motion, useMotionValue } from "framer-motion";
import { MdOutlineRefresh } from "react-icons/md";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";

export default function Companies() {
  const [selectedFilters, setSelectedFilters] = useState(["all"]);
  const [showFilter, setShowFilter] = useState(false);
  const y = useMotionValue(0);
  const drawerRef = useRef(null);

  // 🔍 Filtered companies logic
  const filteredCompanies = selectedFilters.includes("all")
    ? companiesData
    : companiesData.filter((company) =>
        selectedFilters.includes(company.category)
      );

  const handleDragEnd = (_, info) => {
    if (info.offset.y > 100) setShowFilter(false);
    else setShowFilter(true);
  };

  return (
    <div className="flex w-full h-full lg:py-6 py-4 md:px-4 px-0 relative">
      {/* LEFT SIDEBAR */}
      <div className="w-[20vw] space-y-10 hidden lg:block">
        {/* Соёл, Нэмэлт зүйлс */}
        <div>
          <p className="font-bold text-[#020618] mb-4">Соёл, Нэмэлт зүйлс</p>
          <div className="space-y-2">
            <button className="text-sm text-[#020618] px-3 py-2 rounded-[999px] border border-[#CAD5E2]">
              Work/Life balance
            </button>
            <button className="text-sm text-[#020618] px-3 py-2 rounded-[999px] border border-[#CAD5E2]">
              Нэмэлт урамшуулал + Давуу талууд
            </button>
            <button className="text-sm text-[#020618] px-3 py-2 rounded-[999px] border border-[#CAD5E2]">
              Карьерын боломжууд
            </button>
          </div>
        </div>

        {/* Үйл ажиллагааны чиглэл */}
        <div>
          <p className="font-bold text-[#020618] mb-4">
            Үйл ажиллагааны чиглэл
          </p>
          <div>
            {/* “All” button */}
            <button
              onClick={() => {
                if (selectedFilters.includes("all")) return;
                setSelectedFilters(["all"]);
              }}
              className={`group relative text-sm hover:ms-2 ps-2 min-h-10 w-full flex items-center text-start transition-all duration-300 ${
                selectedFilters.includes("all")
                  ? "text-[#020618] font-bold"
                  : "text-[#45556C] hover:text-[#020618]"
              }`}
            >
              <span
                className={`absolute left-0 flex items-center transition-all duration-300 ${
                  selectedFilters.includes("all")
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                <FaChevronRight size={16} />
              </span>

              <span
                className={`transition-all duration-300 ${
                  selectedFilters.includes("all")
                    ? "translate-x-4"
                    : "group-hover:translate-x-4"
                }`}
              >
                Бүх компаниуд
              </span>
            </button>

            {/* Category buttons */}
            {cat.categories?.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedFilters((prev) => {
                    const newFilters = [...prev.filter((f) => f !== "all")];
                    if (prev.includes(item)) {
                      return newFilters.filter((f) => f !== item);
                    } else {
                      return [...newFilters, item];
                    }
                  });
                }}
                className={`group relative text-sm hover:ms-2 ps-2 py-[15px] w-full flex items-center text-start transition-all duration-300 ${
                  selectedFilters.includes(item)
                    ? "text-[#020618] font-bold"
                    : "text-[#45556C] hover:text-[#020618]"
                }`}
              >
                <span
                  className={`absolute left-0 flex items-center transition-all duration-300 ${
                    selectedFilters.includes(item)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  <FaChevronRight size={16} />
                </span>

                <span
                  className={`transition-all duration-300 ${
                    selectedFilters.includes(item)
                      ? "translate-x-4"
                      : "group-hover:translate-x-4"
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Ажилчдын тоо (optional, not yet filtering) */}
        <div>
          <p className="font-semibold mb-2">Ажилчдын тоо</p>
          <div className="flex flex-wrap gap-2">
            {[
              "1-10",
              "11-50",
              "51-200",
              "201-500",
              "5001-2000",
              "2001 - 5000",
              "5000+",
            ].map((n) => (
              <button
                key={n}
                className="text-sm text-[#020618] border rounded-[999px] border-[#CAD5E2] px-2.5 py-1.5"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT MAIN AREA */}
      <div className="flex-1 lg:pl-6 pl-0">
        {/* title */}
        <div className="flex flex-col md:px-0 px-4">
          <div className="flex items-center justify-between mb-4">
            <p className="lg:text-[24px] text-base font-bold text-[#020618]">
              Компаниуд
            </p>

            {/* desktop filter*/}
            <div className="lg:flex hidden items-center gap-3">
              <div className="w-[1px] h-[1rem] bg-[#CAD5E2]" />
              <button className="text-[#020618] border border-[#CAD5E2] py-2.5 px-3 rounded-[999px] flex items-center gap-2">
                А → Я
                <img src="/icon/ascendant.svg" alt="icon" />
              </button>
            </div>
          </div>

          {/* tablet filter */}
          <div className="mb-4 lg:hidden md:flex hidden items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <button className="text-[#020618] border border-[#CAD5E2] py-2 pe-3 ps-3.5 rounded-[999px] flex items-center gap-2 text-sm">
                Соёл, Нэмэлт зүйлс
                <div className="w-5 h-5 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <FaPlus />
                </div>
              </button>
              <button className="text-[#020618] border border-[#CAD5E2] py-2 pe-3 ps-3.5 rounded-[999px] flex items-center gap-2 text-sm">
                Үйл ажиллагааны чиглэл
                <div className="w-5 h-5 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <FaPlus />
                </div>
              </button>
              <button className="text-[#020618] border border-[#CAD5E2] py-2 pe-3 ps-3.5 rounded-[999px] flex items-center gap-2 text-sm">
                Ажлилчдын тоо
                <div className="w-5 h-5 rounded-full bg-[#F1F5F9] flex items-center justify-center">
                  <FaPlus />
                </div>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[1px] h-[1rem] bg-[#CAD5E2]" />
              <button className="text-[#020618] border border-[#CAD5E2] py-1.5 px-3 rounded-[999px] flex items-center gap-2">
                А → Я
              </button>
            </div>
          </div>

          {/* phone filter */}
          <div className="mb-4 md:hidden flex items-center justify-between">
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

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:h-max h-[71vh] md:overflow-hidden overflow-y-scroll scrollbar-hidden md:gap-3 gap-0">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="bg-white md:border border-b border-[#CAD5E2] md:rounded-[16px] p-4  transition hover:border-[#020618]"
            >
              <div className="flex md:items-start items-center justify-between">
                <div className="md:block flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center md:mb-4 mb-0 border">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="md:hidden block w-[40vw]">
                    <p className="font-bold text-[#020618] truncate">
                      {company.name}
                    </p>
                    <p className="text-sm text-[#62748E] truncate">
                      {company.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="text-sm text-[#020618]">
                    {company.jobs} Ажлын зар
                  </p>
                  <FaChevronRight className="text-[#020618]" />
                </div>
              </div>
              <div className="md:block hidden">
                <p className="font-bold text-[#020618] w-full truncate">
                  {company.name}
                </p>
                <p className="text-sm text-[#62748E] w-full truncate">
                  {company.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* If no companies found */}
        {filteredCompanies.length === 0 && (
          <p className="text-[#62748E] mt-6">Компани олдсонгүй.</p>
        )}
      </div>

      {/* drawer */}

      {showFilter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/40 backdrop:blur-sm z-30"
          onClick={() => {
            setShowFilter(false);
          }}
        ></motion.div>
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
            Үйл ажиллагаа
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Соёл
            <IoIosArrowDown />
          </button>
          <button className="w-full flex items-center justify-between px-4 py-2 rounded-[999px] text-[#020618] border border-[#CAD5E2]">
            Соёл
            <IoIosArrowDown />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
