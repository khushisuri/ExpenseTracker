import React from "react";
import { FaArrowRight } from "react-icons/fa";
import TransactionCard from "./cards/TransactionCard";
import moment from 'moment';

const RecentTransactions = ({ transactions, seeMore }) => {
  return (
    <div className="p-5 shadow-md rounded-[10px] my-5">
      <div className="flex items-center justify-between ">
        <h2>Recent Transactions</h2>
        <button className="flex items-center gap-2 bg-gray-200 rounded-[5px] px-2 py-1 cursor-pointer" onClick={() => seeMore()}>
          <p>See All</p>
          <FaArrowRight />
        </button>
      </div>

      <div>
        {transactions.slice(0, 5)?.map((item) => (
          <TransactionCard
            icon={item.icon}
            type={item.type}
            date={moment(item.date).format("Do MMM YYYY")}
            title={item.source}
            amount={item.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
