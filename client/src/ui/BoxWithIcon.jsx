import React from "react";

const BoxWithIcon = ({
  item,
  hasBorder = false,
  hasHover = false,
  size = "text-3xl",
}) => {
  return (
    <div
      className={`transition-color group flex flex-col items-center justify-center gap-5 rounded-md ${
        hasBorder && "border border-black/30"
      } px-4 py-7 text-black duration-300 ${
        hasHover && "hover:bg-primary/80 hover:text-White"
      }`}
    >
      <div
        className={`rounded-full bg-[#c1c1c1] p-3 ${
          hasHover && "group-hover:bg-white/60"
        }`}
      >
        <div className="rounded-full bg-black p-2">
          <img src={item.image} alt="store icon" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <strong className={`font-header ${size}`}>{item.number} </strong>
        <small>{item.text}</small>
      </div>
    </div>
  );
};

export default BoxWithIcon;
