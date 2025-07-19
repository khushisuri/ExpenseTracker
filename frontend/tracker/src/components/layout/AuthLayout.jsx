import React from "react";
import barChart from "../../assets/images/art.jpg";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex flex-col w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative fixed -right-0">
      <StatsInfoCard
        icon={<LuTrendingUpDown />}
        label={"Track your income and expenses"}
        value="430,000"
      />
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-[10%]"></div>
        <div className="w-48 h-56 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5"></div>
        <img
          src={barChart}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-[20px]"
        ></img>
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value }) => {
  return (
    <div className="flex gap-5 w-[80%] m-auto rounded-xl shadow-2xl bg-white p-3 absolute top-[20px] z-10">
      <div className="w-12 h-12 bg-purple-400 flex justify-center items-center rounded-[50%] text-[26px] text-white">
        {icon}
      </div>
      <div>
        <p className="text-gray-400">{label}</p>
        <h3 className="font-bold mt-2">{value}</h3>
      </div>
    </div>
  );
};
