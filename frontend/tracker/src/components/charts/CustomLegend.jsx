import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex items-center justify-around">
      {payload.map((item, idx) => (
        <div className="flex items-center gap-2" key={`legend-${idx}`}>
          <div
            style={{ backgroundColor: item.color }}
            className="w-2.5 h-2.5 rounded-full"
          ></div>
          <span className="text-xs text-gray-7">{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
