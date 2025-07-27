import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-5 shadow-md p-5 rounded-[10px]">
      <div className={`flex justify-center items-center rounded-full w-15 h-15 ${color} text-2xl`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600">{label}</p>
        <h3 className="text-2xl">${value}</h3>
      </div>
    </div>
  );
};

export default InfoCard;
