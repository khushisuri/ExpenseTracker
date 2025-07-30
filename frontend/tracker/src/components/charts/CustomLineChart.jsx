import React from "react";
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col shadow-md rounded-[10px] bg-white p-2">
        <p className="text-purple-500 text-xs">{payload[0].payload.category}</p>
        <p className="text-gray-600">
          Amount:{" "}
          <span className="text-gray-800">${payload[0].payload.amount}</span>
        </p>
      </div>
    );
  }
  return null;
};
const CustomLineChart = ({ data }) => {

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          width={"100%"}
          height={300}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875cf5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month"></XAxis>
          <YAxis />
          <CartesianGrid stroke="none"/>
          <Tooltip content={CustomToolTip}></Tooltip>
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#amountGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
