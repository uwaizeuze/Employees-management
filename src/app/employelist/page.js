"use client";
import Card from "@/components/Card/Card";
import Header from "@/components/Header/Header";
import { getAllEmployees } from "@/indexdb";
import React, { useEffect, useState } from "react";

const EmployeeList = () => {
  const [items, setItem] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const itemData = await getAllEmployees();
      setItem(itemData);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header title="Employee List" />
      <Card item={items} setItem={setItem} />
    </div>
  );
};

export default EmployeeList;
