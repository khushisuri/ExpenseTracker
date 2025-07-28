import React from "react";

const CustomToolTip = ({active, payload}) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col shadow-md rounded-[10px] bg-white p-2">
        <p className="text-purple-500 text-xs">{payload[0].name}</p>
        <p className="text-gray-600">
          Amount: <span className="text-gray-800">${payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomToolTip;
