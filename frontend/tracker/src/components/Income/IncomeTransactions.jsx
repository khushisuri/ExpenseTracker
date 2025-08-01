import React from "react";
import moment from "moment";
import { FaArrowRight } from "react-icons/fa";
import TransactionCard from "../cards/TransactionCard";

const IncomeTransactions = ({ transactions, seeMore }) => {
  return (
    <div className="p-5 shadow-md rounded-[10px] my-5">
      <div className="flex items-center justify-between">
        <h2>Income Transactions</h2>
        <button
          className="flex items-center gap-2 bg-gray-200 rounded-[5px] px-2 py-1 cursor-pointer"
          onClick={() => seeMore()}
        >
          <p>See All</p>
          <FaArrowRight />
        </button>
      </div>
      <div>
        {transactions &&
          transactions
            .slice(0, 5)
            .map((item) => (
              <TransactionCard
                icon={item.icon}
                type="income"
                date={moment(item.date).format("Do MMM YYYY")}
                title={item.source ? item.source : item.category}
                amount={item.amount}
                hideDeleteBtn={true}
              />
            ))}
      </div>
    </div>
  );
};

export default IncomeTransactions;
