import React, { useEffect, useState } from "react";
import CustomBarChart from "./charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../utils/helper";

const IncomeOverview = ({ transactions, setIsModalOpen }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataArr = prepareIncomeBarChartData(transactions);
    setChartData(dataArr);
  }, []);

  return (
    <div className="grid grid-cols-1 p-5 shadow-md rounded-[10px] my-5">
      <div className="flex justify-between items-start py-5">
        <div>
          <h2>Income overview</h2>
          <p className="text-gray-600 text-xs">
            Track your earnings over time and analyze your income trends
          </p>
        </div>
        <button
          className="text-purple-500 border border-purple-300 px-5 py-2 rounded-[10px] cursor-pointer"
          onClick={(i) => setIsModalOpen(true)}
        >
          + Add Income
        </button>
      </div>
      <CustomBarChart data={chartData} xdatakey={"month"} />
    </div>
  );
};

export default IncomeOverview;
