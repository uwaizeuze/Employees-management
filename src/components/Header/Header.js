import React from "react";

const Header = ({ title }) => {
  return (
    <header className="bg-[#1DA1F2] h-14">
      <h1 className="text-lg text-[#fff] font-medium p-4 font-serif ">
        {title}
      </h1>
    </header>
  );
};

export default Header;
