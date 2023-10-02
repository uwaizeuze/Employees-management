"use client";
import Header from "@/components/Header/Header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NoEmployeeFound from "../assets/images/NoEmployeeFound.svg";
import PluseIcon from "../assets/images/PlusIcon.png";
import { useRouter } from "next/navigation";
import { getAllEmployees } from "@/indexdb";
import Card from "@/components/Card/Card";

const EmployList = () => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/addemployedetail");
  };

  return (
    <div>
      <Header title="Employee List" />
      <main className="">
        <div className="h-[80vh] flex justify-center items-center">
          <Image src={NoEmployeeFound} width={260} alt="No employee found" />
        </div>

        <div
          className="flex justify-end items-center mr-[30px] "
          onClick={handleNavigation}
        >
          <button className="w-[50px] h-[40px] bg-[#1DA1F2] rounded-md shadow-lg flex justify-center items-center">
            <Image src={PluseIcon} alt="Pulse Icon" width={15} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default EmployList;
