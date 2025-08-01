import React from "react";
import moment from "moment";
import TransactionCard from "../cards/TransactionCard";
import { LuDownload } from "react-icons/lu";

const ExpenseList = ({ transactions, setIsDeleteModalOpen, downloadExcel }) => {
  return (
    <div className="p-5 shadow-md rounded-[10px] my-5">
      <div className="flex items-center justify-between ">
        <h2>All Expense transactions</h2>
        <button
          className="flex items-center text-purple-500 border border-purple-300 px-5 py-2 rounded-[10px] cursor-pointer gap-6"
          onClick={() => downloadExcel()}
        >
          Download <LuDownload />
        </button>
      </div>

      <div>
        {transactions.map((item)=> (
          <TransactionCard
            key={item._id}
            icon={item.icon}
            type={"expense"}
            date={moment(item.date).format("Do MMM YYYY")}
            title={item.source ? item.source : item.category}
            amount={item.amount}
            id={item._id}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
