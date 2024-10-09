import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const colors = ["#FF6347", "#4682B4", "#32CD32"]; // Tomato, SteelBlue, LimeGreen

  const dummyResponse = {
    labels: ["High", "Medium", "Low"],
    data: [3, 2, 0], // Replace with your counts
  };
  const pieData = dummyResponse.labels.map((label, index) => ({
    name: label,
    value: dummyResponse.data[index],
  }));
  return (
    <div
      style={{
        backgroundColor: "#2C3E50",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ color: "#ECF0F1" }}>Ticket Priority Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={40} // Creates a doughnut effect
            fill="#8884d8"
            paddingAngle={5} // Adds space between slices
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-in-out"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
