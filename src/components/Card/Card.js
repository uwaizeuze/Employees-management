"use client";

import { deleteEmployee, getAllEmployees } from "@/indexdb";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { PiTrashLight } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import PluseIcon from "../assets/images/PlusIcon.png";
import PluseIcon from "../../assets/images/PlusIcon.png";
import { useRouter } from "next/navigation";

const EmployeeList = ({
  employees,
  title,
  setItem,
  currentEmployees,
  PreviousEmployees,
}) => {
  const [deleteButtonsVisible, setDeleteButtonsVisible] = useState(
    Array(employees.length).fill(false)
  );

  const toggleDeleteButton = (index) => {
    const newDeleteButtonsVisible = [...deleteButtonsVisible];
    newDeleteButtonsVisible[index] = !newDeleteButtonsVisible[index];
    setDeleteButtonsVisible(newDeleteButtonsVisible);
  };
  const fetchEmployees = async () => {
    const employeesData = await getAllEmployees();
    setItem(employeesData);
    try {
    } catch (error) {}
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployeeId = async (id) => {
    try {
      await deleteEmployee(id);
      console.log(`employee with id ${id} is delete`);
      toast.success(`deleted employee with id ${id}`);
      fetchEmployees();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const router = useRouter();
  const handleNavigation = (id) => {
    router.push(`/employelist/${id}`);
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="bg-gray-200 h-12">
        <h1 className="text-[#1DA1F2] font-semibold text-base p-3 ml-4">
          {title}
        </h1>
      </div>
      {employees?.map(
        (
          { employeeName, selected, id, selectedDateFrom, selectedDateTo },
          index
        ) => (
          <div key={index} className="relative">
            <div
              className={`${
                deleteButtonsVisible[index] ? "ml-0" : "ml-10"
              } transition-all ease-in-out`}
              onClick={() => toggleDeleteButton(index)}
            >
              <h1 className="text-black font-bold uppercase my-3">
                {employeeName}
              </h1>

              <h1 className="text-[#949C9E] font-normal text-sm my-1">
                {selected}
              </h1>
              {currentEmployees?.length > 0 && (
                <h1 className="text-[#949C9E] font-normal text-sm my-1">
                  From : {selectedDateFrom}
                </h1>
              )}
              {PreviousEmployees?.length > 0 && (
                <h1 className="text-[#949C9E] font-normal text-sm my-3">
                  {selectedDateFrom} - {selectedDateTo}
                </h1>
              )}
              {/* <Link href={`/employelist/${id}`}> */}
              <button
                onClick={() => handleNavigation(id)}
                className="w-[30px] h-[30px] bg-[#1DA1F2] rounded-md shadow-lg flex justify-center items-center my-3"
              >
                <Image src={PluseIcon} alt="Pulse Icon" width={10} />
              </button>
              {/* </Link> */}
              <div className="border-b border-gray-100 " />
            </div>

            <div
              className={`absolute -right-1 top-0 h-full border-b border-gray-50  w-1/5 bg-red-500 ${
                deleteButtonsVisible[index] ? "opacity-100" : "opacity-0"
              } transition-all ease-in-out`}
              onClick={() => toggleDeleteButton(index)}
            />

            {/* <button
              className={`absolute right-0 top-0 mt-2 mr-4 px-2 py-1 bg-red-500 text-white rounded ${
                deleteButtonsVisible[index] ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => deleteEmployeeId(id)}
            >
              <PiTrashLight size="30px" />
            </button> */}
            <button
              className={`absolute right-0 top-0 mt-2 mr-4 px-2 py-1 bg-red-500 text-white rounded ${
                deleteButtonsVisible[index] ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => deleteEmployeeId(id)}
            >
              <div className="relative">
                {window.innerWidth > 640 ? (
                  <PiTrashLight
                    size="40px"
                    className="absolute top-8 right-24"
                  />
                ) : (
                  <PiTrashLight
                    size="20px"
                    className="absolute top-7 -right-3"
                  />
                )}
              </div>
            </button>
          </div>
        )
      )}
    </div>
  );
};

const Card = ({ item, setItem }) => {
  const currentDate = new Date();
  /// filter on the basis of current employee
  const currentEmployees = item.filter((employee) => {
    const startDate = new Date(employee?.selectedDateFrom);
    const endDate = new Date(employee?.selectedDateTo);
    return startDate <= currentDate && endDate >= currentDate;
  });

  const PreviousEmployees = item.filter((employee) => {
    const startDate = new Date(employee?.selectedDateFrom);
    const endDate = new Date(employee?.selectedDateTo);
    return endDate < currentDate;
  });
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/addemployedetail");
  };
  return (
    <>
      {currentEmployees.length > 0 && (
        <EmployeeList
          employees={currentEmployees}
          title="Current employees"
          setItem={setItem}
          currentEmployees={currentEmployees}
        />
      )}
      {PreviousEmployees.length > 0 && (
        <EmployeeList
          employees={PreviousEmployees}
          title="Previous employees"
          setItem={setItem}
          PreviousEmployees={PreviousEmployees}
        />
      )}

      <div
        className="flex justify-end items-center mr-[30px] mt-5 "
        onClick={handleNavigation}
      >
        <button className="w-[50px] h-[40px] bg-[#1DA1F2] rounded-md shadow-lg flex justify-center items-center">
          <Image src={PluseIcon} alt="Pulse Icon" width={15} />
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Card;
