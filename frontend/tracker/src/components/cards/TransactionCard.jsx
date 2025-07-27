import React from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";
import { CiForkAndKnife } from "react-icons/ci";

const TransactionCard = ({
  icon,
  type,
  date,
  title,
  hideDeleteBtn,
  amount,
}) => {
  return (
    <div className="flex items-center justify-between my-5 bg-gray-100 rounded-[10px] px-5 py-2">
      <div className="flex items-center gap-6">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
          {icon ? (
            <img src={icon} alt="transaction-icon"></img>
          ) : (
            <CiForkAndKnife />
          )}
        </div>

        <div className="flex flex-col">
          <h2>{title}</h2>
          <p className="text-xs text-gray-600">{date}</p>
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-1 ${
          type == "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        } rounded-[10px] px-2 py-1 `}
      >
        <span> {type == "income" ? "+" : "-"}</span>
        <span>${amount}</span>
        {type == "income" ? (
          <HiMiniArrowTrendingUp />
        ) : (
          <HiMiniArrowTrendingDown />
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
