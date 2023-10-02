"use client";
import Header from "@/components/Header/Header";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Person from "../../../assets/images/Person.svg";
import Button from "@/components/Button/Button";
import SuiteKitBox from "../../../assets/images/suitekitbox.svg";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { BsArrowRight } from "react-icons/bs";
import { getEmployeeById, updateEmployee } from "@/indexdb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useParams } from "next/navigation";

const EmployeeDetail = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [selected, setSelected] = useState("Chose any option");
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [singleEmployee, setSingleEmployee] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const router = useRouter();
  const { Id } = useParams();

  const options = [
    {
      key: 1,
      value: "Chose any option",
    },
    {
      key: 2,
      value: "QA Engineer",
    },
    {
      key: 3,
      value: "Flutter Developer",
    },
    {
      key: 4,
      value: "Frontend Developer",
    },
    {
      key: 5,
      value: "Backend Developer",
    },
    {
      key: 6,
      value: "Product Designer",
    },
    {
      key: 7,
      value: "Product Owner",
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderCustomOption = (option) => (
    <div
      onClick={() => handleChange(option.value)}
      className="flex justify-between p-2 hover:text-[#1D4ED8]"
    >
      <span className="">{option.label}</span>
      <span>{option.count}</span>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      if (Id && !singleEmployee) {
        try {
          const employData = await getEmployeeById(parseInt(Id));

          setSingleEmployee(employData);
          if (employData) {
            setEmployeeName(employData?.employeeName);
            setSelected(employData?.selected);
            setSelectedDateFrom(employData?.selectedDateFrom);
            setSelectedDateTo(employData?.selectedDateTo);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [singleEmployee, Id]);

  const handleAddEmployee = async (event) => {
    // event.preventDefault();

    try {
      const newEmployee = {
        employeeName,
        selected,
        selectedDateFrom,
        selectedDateTo,
      };
      if (
        !newEmployee.employeeName ||
        !newEmployee.selected ||
        !newEmployee.selectedDateFrom
      ) {
        toast.error("please fill in all required fields ");
        return;
      }

      const id = await updateEmployee(parseInt(Id), newEmployee);
      console.log(Id);
      console.info(`employee is update by this id ${Id}`);
      toast.success(` employee is update by this id ${Id}`);

      setTimeout(() => {
        router.push("/employelist");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleButtonClick = () => {
    console.log("Button Clicked");
  };
  const datePickerExtraFooter = (
    <div className="flex items-center justify-between p-2">
      <Button value="Cancel" text="Cancel" onClick={handleButtonClick} />
      <Button
        value="Save"
        text="Save"
        type="submit"
        onClick={handleButtonClick}
      />
    </div>
  );
  const today = dayjs();
  const nextMonday = today.day(1).add(7, "d"); // Find the next Monday
  const nextTuesday = today.day(2).add(7, "d"); // Find the next Tuesday
  const afterOneWeek = today.add(1, "w");
  return (
    <div>
      <Header title="Edit Employee Details" />
      <div>
        <form>
          <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-4 mx-auto">
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <div className="flex flex-wrap -m-2">
                  <div className="relative flex w-full flex-wrap items-stretch mb-3 my-5">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                      <Image src={Person} width={20} alt="person" />
                    </span>
                    <input
                      type="text"
                      placeholder="Employee name"
                      value={employeeName}
                      className="  px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full pl-10"
                      onChange={(e) => setEmployeeName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium  text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "13px",
                        left: "10px",
                      }}
                    >
                      <Image src={SuiteKitBox} width={15} alt="suitebox" />
                    </span>
                  </div>
                  <select
                    id="countries"
                    className="bg-white border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  rounded  outline-none focus:outline-none focus:ring pl-10 custom-select "
                    onChange={(e) => {
                      setSelected(e.target.value);
                    }}
                    value={selected}
                  >
                    {options?.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between p-2 my-3">
                  <DatePicker
                    presets={[
                      { label: "Today", value: today },
                      { label: "Next Monday", value: nextMonday },
                      { label: "Next Tuesday", value: nextTuesday },
                      { label: "After 1 Week", value: afterOneWeek },
                    ]}
                    onChange={(date) =>
                      setSelectedDateFrom(
                        date ? dayjs(date).format("YYYY-MM-DD") : null
                      )
                    }
                    value={selectedDateFrom ? dayjs(selectedDateFrom) : null}
                    renderExtraFooter={() => datePickerExtraFooter}
                    showToday={false}
                    placeholder="Today"
                  />
                  <BsArrowRight color="blue" className="mx-1" />
                  <DatePicker
                    presets={[{ label: "Today", value: today }]}
                    renderExtraFooter={() => datePickerExtraFooter}
                    showToday={false}
                    placeholder="No Date"
                    onChange={(date) =>
                      setSelectedDateTo(
                        date ? dayjs(date).format("YYYY-MM-DD") : null
                      )
                    }
                    value={selectedDateTo ? dayjs(selectedDateTo) : null}
                  />
                </div>
                <div class="border-1 border-t border-[#F2F2F2] w-[100%]"></div>

                <div className=" space-x-4 space-y-4 text-end  ">
                  <Button
                    value="Cancel"
                    text="Cancel"
                    onClick={() => router.back()}
                  />
                  <Button
                    value="Save"
                    text="Save"
                    type="submit"
                    onClick={() => handleAddEmployee()}
                  />
                </div>
              </div>
            </div>
            <div></div>
          </section>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmployeeDetail;
