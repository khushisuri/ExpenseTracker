import React, { useEffect, useState } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const Last60Income = ({ transactions, totalAmount }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = (data) => {
    const dataArr = data.map((it) => ({
      name: it.source,
      amount: it.amount,
    }));
    return dataArr;
  };
  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

  useEffect(() => {
    const dt = prepareChartData(transactions);
    setChartData(dt);
  }, []);

  return (
    <div className="p-5 shadow-md rounded-[10px] my-5">
      <div className="flex items-center justify-between">
        <h2>Last 60 days Income</h2>
      </div>
      <div>
        <CustomPieChart
          data={chartData}
          label="Total Income"
          totalAmount={totalAmount}
          colors={COLORS}
          showTextAnchor
        />
      </div>
    </div>
  );
};

export default Last60Income;
