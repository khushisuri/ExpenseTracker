import React, { useState, useEffect } from "react";
import { prepareListBarChartData } from "../../utils/helper";
import CustomLineChart from "../charts/CustomLineChart";

const ExpenseOverview = ({ transactions, setIsModalOpen }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = prepareListBarChartData(transactions);
    setChartData(dataArr);
  }, []);

  return (
    <div className="grid grid-cols-1 p-5 shadow-md rounded-[10px] my-5">
      <div className="flex justify-between items-start py-5">
        <div>
          <h2>Expense overview</h2>
          <p className="text-gray-600 text-xs">
            Track your earnings over time and analyze your income trends
          </p>
        </div>
        <button
          className="text-purple-500 border border-purple-300 px-5 py-2 rounded-[10px] cursor-pointer"
          onClick={(i) => setIsModalOpen(true)}
        >
          + Add Expense
        </button>
      </div>
      <CustomLineChart data={chartData} />
    </div>
  );
};

export default ExpenseOverview;
