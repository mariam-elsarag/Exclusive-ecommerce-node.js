import React from "react";

const Input = ({ label, labelId, inputType, placeholder }) => {
  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <label htmlFor={labelId} className="text-sm font-normal text-gray-400">
        {label}
      </label>
      <input
        type={inputType}
        id={labelId}
        placeholder={placeholder}
        className="rounded-md bg-gray-100 px-2 py-3 focus:outline-none"
      />
    </div>
  );
};

export default Input;
