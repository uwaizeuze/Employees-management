import React from "react";

const Button = ({ value, text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[70px] h-[40px] ${
        value === "Save" ? "bg-[#1DA1F2]" : "bg-[#EDF8FF]"
      } rounded-md shadow-lg ${
        value === "Save" ? "text-white" : "text-[#1DA1F2]"
      }  font-medium text-sm `}
    >
      {text}
    </button>
  );
};

export default Button;
