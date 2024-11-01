import React from "react";
import { Arrow } from "../assets/image";

const Pagination = ({ next, prev, handleNext, handlePrev }) => {
  return (
    <div
      className="flex flex-row-reverse items-center gap-4"
      onClick={handleNext}
    >
      <span
        role={next ? "button" : ""}
        className={`flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F5F5F5] ${
          next ? "" : "hidden"
        } `}
      >
        <img src={Arrow} className="h-[18px] w-[18px]" />
      </span>
      {/* prev */}
      <span
        role={prev ? "button" : ""}
        onClick={handlePrev}
        className={`flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F5F5F5] ${
          prev ? "" : "hidden"
        }`}
      >
        <img src={Arrow} className="h-[18px] w-[18px] rotate-180" />
      </span>
    </div>
  );
};

export default Pagination;
