import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getBarColor = (idx) => {
  return idx % 2 === 0 ? "#875cf5" : "#cfbefb";
};

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

const CustomBarChart = ({ data ,xdatakey}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey={xdatakey}
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
        <Tooltip content={CustomToolTip} />
        <Legend />
        <Bar
          dataKey="amount"
          fill="#FF8042"
          radius={[10, 10, 0, 0]}
        >
          {data.map((item, idx) => {
            return <Cell key={idx} fill={getBarColor(idx)} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
