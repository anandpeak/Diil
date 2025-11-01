import { IoIosArrowForward } from "react-icons/io";

const SpecialOffer = ({ job }) => {
  return (
    <div
      className="relative rounded-[16px] p-[2px] 
             md:min-w-[350px]  
             lg:w-full lg:min-w-0 lg:shrink
             w-full min-w-0 shrink"
      style={{ background: job.gradientMain }}
    >
      <div className="relative rounded-[14px] bg-white p-2.5">
        {/* Overlay gradient */}
        <div
          className="absolute inset-0 opacity-10 rounded-[14px] pointer-events-none"
          style={{ background: job.gradientOverlay }}
        ></div>

        {/* Top section */}
        <div className="relative w-full flex items-center justify-between">
          <img src={job.logo} alt="logo" />
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-[#E2E8F0]">
            <IoIosArrowForward />
          </div>
        </div>

        {/* Job title & salary */}
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-[#020618]">{job.title}</p>
          <p className="font-bold text-[#020618]">{job.salary}</p>
        </div>

        {/* Company & date */}
        <div className="flex items-center gap-3 mt-2">
          <p className="text-[#020618] text-sm">{job.company}</p>
          <p className="text-[#020618] text-sm">{job.date}</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
