import React, { useState } from "react";
import { RiArrowRightUpLine } from "react-icons/ri";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const DNA = () => {
  const [page, setPage] = useState(1);
  const totalPages = 6;
  const progress = (page / totalPages) * 100;
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [image, setImage] = useState(null);
  const [activeMobileTab, setActiveMobileTab] = useState("mydna");

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const pageTitles = [
    {
      title: "What I work for",
      desc: "Pick your top 3 ~ Life balance",
    },
    {
      title: "Upload profile image",
      desc: "Та зургаа оруулна уу",
    },
  ];

  const traits = [
    {
      id: "credit",
      title: "Get Credit",
      subtitle: "People see my good work",
      icon: "/icon/dna/credit.svg",
      miniIcon: "/icon/dna/creditM.svg",
      color: "#4258FF",
    },
    {
      id: "move",
      title: "Move Up",
      subtitle: "Higher positions",
      icon: "/icon/dna/move.svg",
      miniIcon: "/icon/dna/moveM.svg",
      color: "#FF4D29",
    },
    {
      id: "expert",
      title: "Be The Expert",
      subtitle: "Best at what I do",
      icon: "/icon/dna/expert.svg",
      miniIcon: "/icon/dna/expertM.svg",
      color: "#FFE83E",
    },
    {
      id: "hustler",
      title: "Hustler",
      subtitle: "Always grinding",
      icon: "/icon/dna/hustler.svg",
      miniIcon: "/icon/dna/hustlerM.svg",
      color: "#29EAFF",
    },
  ];

  const toggleTrait = (id) => {
    setSelectedTraits((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* ---------- DESKTOP/TABLET VIEW ---------- */}

      <div className="hidden md:block lg:flex w-full lg:h-[calc(100vh-4rem)] md:h-auto items-start">
        {/* Left side */}
        <div className="lg:w-[50%] w-full h-full flex-1 p-6 flex flex-col">
          {" "}
          <div className="relative w-full h-full rounded-[24px] p-0.5 bg-[linear-gradient(90deg,#FF4D29,#FFE83E)]">
            <div className="relative rounded-[22px] bg-[#fff] w-full h-full p-3 overflow-hidden">
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6829] to-[#E8FF3E] opacity-10 z-0"></div>

              <div className="relative h-full z-10 flex flex-col items-center justify-between py-10 px-8">
                {/* content */}
                <div className="bg-white w-full rounded-[16px] p-6 shadow-sm mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="w-[8rem] h-[8rem] rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-center font-bold text-[#020618]">
                      Bataa Batbaigal
                    </p>
                    <p className="text-center text-[#62748E] text-xs">
                      UXUI Designer
                    </p>
                  </div>
                  {/* credits */}
                  <div className="flex w-full flex-wrap items-center gap-2 justify-center">
                    {traits
                      .filter((trait) => selectedTraits.includes(trait.id))
                      .map((trait) => (
                        <div
                          key={trait.id}
                          className="border border-[#CAD5E2] rounded-[999px] py-1 ps-1 pe-2 flex items-center gap-1.5"
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: trait.color }}
                          >
                            <img src={trait.miniIcon} alt="icon" />
                          </div>
                          <p className="text-sm text-[#020618]">
                            {trait.title}
                          </p>
                        </div>
                      ))}
                    <div className="border border-[#CAD5E2] rounded-[999px] py-1 ps-1 pe-2 flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-[#020618] rounded-full flex items-center justify-center">
                        <img src="/icon/dna/honest.svg" alt="icon" />
                      </div>
                      <p className="text-sm text-[#020618]">Honest</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="w-[50%] rounded-[16px] p-4 bg-[#fff] space-y-4">
                    <div className="flex items-center justify-between">
                      <img src="/icon/dna/ig.svg" alt="icon" />
                      <button>
                        <RiArrowRightUpLine className="text-lg" />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-[#020618]">
                        Share Instagram
                      </p>
                      <p className="text-xs text-[#62748E]">
                        Instant story sharing link
                      </p>
                    </div>
                  </div>
                  <div className="w-[50%] rounded-[16px] p-4 bg-[#fff] space-y-4">
                    <div className="flex items-center justify-between">
                      <img src="/icon/dna/fb.svg" alt="icon" />
                      <button>
                        <RiArrowRightUpLine className="text-lg" />
                      </button>
                    </div>
                    <div>
                      <p className="font-bold text-[#020618]">Share Facebook</p>
                      <p className="text-xs text-[#62748E]">Higher positions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="lg:w-[50%] w-full h-full px-20 pt-20 pb-4 flex flex-col justify-between">
          {/* top side */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center w-full justify-between mb-2">
                <p className="text-[#020618] font-bold">Work DNA тодорхойлох</p>
                <div className="rounded-[99px] border border-[#CAD5E2] py-1 px-2">
                  <p className="text-[#020618] text-sm">
                    {page}{" "}
                    <span className="text-[#90A1B9]">/ {totalPages}</span>
                  </p>
                </div>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-[999px] p-0.5 h-[18px]">
                <div
                  className="bg-[#29EAFF] h-full rounded-[999px]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            {/* content */}
            <div className="w-full lg:pb-0 md:pb-10">
              <div className="w-full bg-[#F1F5F9] rounded-[16px] p-6 mb-3">
                <p className="text-[24px] font-bold text-[#020618]">
                  {pageTitles[page - 1].title}
                </p>
                <p className="text-sm text-[#62748E]">
                  {pageTitles[page - 1].desc}
                </p>
              </div>
              {page === 1 ? (
                <div className="w-full space-y-3">
                  {traits.map((trait) => (
                    <div
                      key={trait.id}
                      className={`w-full p-4 border rounded-[16px] flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 ${
                        selectedTraits.includes(trait.id)
                          ? "border-transparent bg-[#020618] hover:bg-[#1D293D]"
                          : "border-[#CAD5E2] hover:bg-[#F1F5F9] group"
                      }`}
                      onClick={() => toggleTrait(trait.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            selectedTraits.includes(trait.id)
                              ? "bg-[#29EAFF]"
                              : "bg-[#F1F5F9]"
                          }`}
                        >
                          <img src={trait.icon} alt="icon" />
                        </div>
                        <div>
                          <p
                            className={`font-bold transition-all duration-300 ${
                              selectedTraits.includes(trait.id)
                                ? "text-[#fff]"
                                : "text-[#020618]"
                            } font-bold`}
                          >
                            {trait.title}
                          </p>
                          <p
                            className={`text-xs transition-all duration-300
                      ${
                        selectedTraits.includes(trait.id)
                          ? "text-[#90A1B9]"
                          : " text-[#62748E]"
                      }`}
                          >
                            {trait.subtitle}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          selectedTraits.includes(trait.id)
                            ? " border-[#fff]"
                            : "border-[#020618]"
                        }`}
                      >
                        {selectedTraits.includes(trait.id) && (
                          <div className="w-2 h-2 bg-white rounded-full transition-all duration-300" />
                        )}
                        <div className="group-hover:block w-2 h-2 bg-[#020618] rounded-full transition-all duration-300 hidden" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="border border-dashed border-[#CAD5E2] w-full h-[15rem] flex items-center justify-center rounded-[16px] relative overflow-hidden">
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        {/* Delete Button */}
                        <button
                          onClick={() => setImage(null)}
                          className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center">
                        <p className="text-[#020618] font-bold">
                          Profile Image
                        </p>
                        <p className="text-xs text-[#62748E]">
                          JPEG, JPG, PNG, GIF
                        </p>
                        <label className="mt-6 cursor-pointer flex items-center gap-2 rounded-[99px] py-1 ps-4 pe-1 bg-[#E2E8F0]">
                          Зураг оруулах
                          <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#fff]">
                            <LuArrowRight className="text-xl" />
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* bottom side */}
          <div
            className={`flex items-center w-full my-4 ${
              page === 1 ? "justify-end" : "justify-between"
            }`}
          >
            <button
              onClick={() => {
                setPage(page - 1);
              }}
              className={`${
                page === 1 ? "hidden" : "flex"
              } items-center gap-2 py-1 ps-1 pe-3 text-[#020618] hover:bg-[#E2E8F0] rounded-[99px] transition-all duration-300`}
            >
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#fff]">
                <LuArrowLeft className="text-xl" />
              </div>
              Буцах
            </button>
            <button
              onClick={() => {
                if (page === 2) {
                } else {
                  setPage(page + 1);
                }
              }}
              className="flex items-center gap-2 py-1 ps-6 pe-1 bg-[#020618] hover:bg-[#29EAFF] rounded-[99px] transition-all duration-300 group"
            >
              <p className="text-[#fff] transition-colors duration-300 group-hover:text-[#0F172B]">
                Тодорхойлох
              </p>
              <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#1D293D]">
                <LuArrowRight className="text-[#fff] text-xl group-hover:text-[#29EAFF] duration-300 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- MOBILE VIEW ---------- */}
      <div className="flex flex-col md:hidden w-full">
        <div className="flex w-full justify-between mb-1 pt-4 px-4">
          <button
            className={`w-[48%] md:py-2 py-1.5 rounded-full bg-white border md:text-base text-sm ${
              activeMobileTab === "mydna"
                ? "border-[#020618]"
                : "border-[#CAD5E2]"
            }`}
            onClick={() => setActiveMobileTab("mydna")}
          >
            Миний DNA Карт
          </button>
          <button
            className={`w-[48%] md:py-2 py-1.5 rounded-full bg-white border md:text-base text-sm ${
              activeMobileTab === "workdna"
                ? "border-[#020618]"
                : "border-[#CAD5E2]"
            }`}
            onClick={() => setActiveMobileTab("workdna")}
          >
            DNA Тодорхойлох
          </button>
        </div>
        {activeMobileTab === "mydna" ? (
          <div className="w-full  p-4">
            <div className="relative w-full h-full rounded-[24px] p-0.5 bg-[linear-gradient(90deg,#FF4D29,#FFE83E)]">
              <div className="relative rounded-[22px] bg-[#fff] w-full h-full p-3 overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6829] to-[#E8FF3E] opacity-10 z-0"></div>

                <div className="relative h-full z-10 flex flex-col items-center justify-between p-3">
                  {/* content */}
                  <div className="bg-white w-full rounded-[16px] p-4 shadow-sm mb-2">
                    <div className="flex justify-center mb-4">
                      <div className="w-[8rem] h-[8rem] rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-center font-bold text-[#020618]">
                        Bataa Batbaigal
                      </p>
                      <p className="text-center text-[#62748E] text-xs">
                        UXUI Designer
                      </p>
                    </div>
                    {/* credits */}
                    <div className="flex w-full flex-wrap items-center gap-2 justify-center">
                      {traits
                        .filter((trait) => selectedTraits.includes(trait.id))
                        .map((trait) => (
                          <div
                            key={trait.id}
                            className="border border-[#CAD5E2] rounded-[999px] py-1 ps-1 pe-2 flex items-center gap-1.5"
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: trait.color }}
                            >
                              <img src={trait.miniIcon} alt="icon" />
                            </div>
                            <p className="text-sm text-[#020618]">
                              {trait.title}
                            </p>
                          </div>
                        ))}
                      <div className="border border-[#CAD5E2] rounded-[999px] py-1 ps-1 pe-2 flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-[#020618] rounded-full flex items-center justify-center">
                          <img src="/icon/dna/honest.svg" alt="icon" />
                        </div>
                        <p className="text-sm text-[#020618]">Honest</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-full gap-2">
                    <div className="w-full rounded-[16px] p-4 bg-[#fff]">
                      <div className="flex items-center justify-between mb-4">
                        <img src="/icon/dna/ig.svg" alt="icon" />
                        <button>
                          <RiArrowRightUpLine className="text-lg" />
                        </button>
                      </div>
                      <div>
                        <p className="font-bold text-[#020618]">
                          Share Instagram
                        </p>
                        <p className="text-xs text-[#62748E]">
                          Instant story sharing link
                        </p>
                      </div>
                    </div>
                    <div className="w-full rounded-[16px] p-4 bg-[#fff]">
                      <div className="flex items-center justify-between mb-4">
                        <img src="/icon/dna/fb.svg" alt="icon" />
                        <button>
                          <RiArrowRightUpLine className="text-lg" />
                        </button>
                      </div>
                      <div>
                        <p className="font-bold text-[#020618]">
                          Share Facebook
                        </p>
                        <p className="text-xs text-[#62748E]">
                          Higher positions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full p-10">
            {/* top side */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center w-full justify-between mb-2">
                  <p className="text-[#020618] font-bold">
                    Work DNA тодорхойлох
                  </p>
                  <div className="rounded-[99px] border border-[#CAD5E2] py-1 px-2">
                    <p className="text-[#020618] text-sm">
                      {page}{" "}
                      <span className="text-[#90A1B9]">/ {totalPages}</span>
                    </p>
                  </div>
                </div>
                <div className="w-full bg-[#F1F5F9] rounded-[999px] p-0.5 h-[18px]">
                  <div
                    className="bg-[#29EAFF] h-full rounded-[999px]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              {/* content */}
              <div className="w-full pb-4">
                <div className="w-full bg-[#F1F5F9] rounded-[16px] p-6 mb-3">
                  <p className="text-[24px] font-bold text-[#020618]">
                    {pageTitles[page - 1].title}
                  </p>
                  <p className="text-sm text-[#62748E]">
                    {pageTitles[page - 1].desc}
                  </p>
                </div>
                {page === 1 ? (
                  <div className="w-full space-y-3">
                    {traits.map((trait) => (
                      <div
                        key={trait.id}
                        className={`w-full p-4 border rounded-[16px] flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 ${
                          selectedTraits.includes(trait.id)
                            ? "border-transparent bg-[#020618] hover:bg-[#1D293D]"
                            : "border-[#CAD5E2] hover:bg-[#F1F5F9] group"
                        }`}
                        onClick={() => toggleTrait(trait.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              selectedTraits.includes(trait.id)
                                ? "bg-[#29EAFF]"
                                : "bg-[#F1F5F9]"
                            }`}
                          >
                            <img src={trait.icon} alt="icon" />
                          </div>
                          <div>
                            <p
                              className={`font-bold transition-all duration-300 ${
                                selectedTraits.includes(trait.id)
                                  ? "text-[#fff]"
                                  : "text-[#020618]"
                              } font-bold`}
                            >
                              {trait.title}
                            </p>
                            <p
                              className={`text-xs transition-all duration-300
                      ${
                        selectedTraits.includes(trait.id)
                          ? "text-[#90A1B9]"
                          : " text-[#62748E]"
                      }`}
                            >
                              {trait.subtitle}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            selectedTraits.includes(trait.id)
                              ? " border-[#fff]"
                              : "border-[#020618]"
                          }`}
                        >
                          {selectedTraits.includes(trait.id) && (
                            <div className="w-2 h-2 bg-white rounded-full transition-all duration-300" />
                          )}
                          <div className="group-hover:block w-2 h-2 bg-[#020618] rounded-full transition-all duration-300 hidden" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    <div className="border border-dashed border-[#CAD5E2] w-full h-[15rem] flex items-center justify-center rounded-[16px] relative overflow-hidden">
                      {image ? (
                        <>
                          <img
                            src={image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                          {/* Delete Button */}
                          <button
                            onClick={() => setImage(null)}
                            className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-100"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center">
                          <p className="text-[#020618] font-bold">
                            Profile Image
                          </p>
                          <p className="text-xs text-[#62748E]">
                            JPEG, JPG, PNG, GIF
                          </p>
                          <label className="mt-6 cursor-pointer flex items-center gap-2 rounded-[99px] py-1 ps-4 pe-1 bg-[#E2E8F0]">
                            Зураг оруулах
                            <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#fff]">
                              <LuArrowRight className="text-xl" />
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* bottom side */}
            <div
              className={`flex items-center w-full  ${
                page === 1 ? "justify-end" : "justify-between"
              }`}
            >
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
                className={`${
                  page === 1 ? "hidden" : "flex"
                } items-center gap-2 py-1 ps-1 pe-3 text-[#020618] hover:bg-[#E2E8F0] rounded-[99px] transition-all duration-300`}
              >
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#fff]">
                  <LuArrowLeft className="text-xl" />
                </div>
                Буцах
              </button>
              <button
                onClick={() => {
                  if (page === 2) {
                  } else {
                    setPage(page + 1);
                  }
                }}
                className="flex items-center gap-2 py-1 ps-6 pe-1 bg-[#020618] hover:bg-[#29EAFF] rounded-[99px] transition-all duration-300 group"
              >
                <p className="text-[#fff] transition-colors duration-300 group-hover:text-[#0F172B]">
                  Тодорхойлох
                </p>
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-[#1D293D]">
                  <LuArrowRight className="text-[#fff] text-xl group-hover:text-[#29EAFF] duration-300 transition-colors" />
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DNA;
