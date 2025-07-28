import React from "react";
import CustomPieChart from "./charts/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({totalBalance, totalExpense, totalIncome}) => {
  
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  return (
    <div className="p-5 shadow-md rounded-[10px] my-5">
      <div>
        <h2>Finance Overview</h2>
        <div>
          <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
