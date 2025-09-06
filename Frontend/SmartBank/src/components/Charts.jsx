import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { category: "Food", amount: 4500 },
  { category: "Travel", amount: 3200 },
  { category: "Shopping", amount: 2700 },
  { category: "Bills", amount: 1500 },
  { category: "Others", amount: 900 },
  { category: "Service", amount: 900 },
];

export default function ExpenseChart() {
  return (
    <div className="w-full max-w-4xl mx-auto"> 
      <h2 className="text-xl font-semibold mb-3 text-gray-800">
        Monthly Expenses
      </h2>

      {/* 👇 enforce fixed height */}
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
