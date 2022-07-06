import { Cell, Pie, PieChart } from "recharts";

import { getTailwindColor } from "@/styles/theme";

const data = [
  { name: "Group A", value: 25 },
  { name: "Group B", value: 10 },
  { name: "Group C", value: 35 },
  { name: "Group D", value: 30 },
];

const COLORS = ["light-purple", "light-gray-blue", "red", "orange"].map(
  getTailwindColor
);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      dominantBaseline="central"
      fill="black"
      fontSize="14"
      textAnchor={x > cx ? "start" : "end"}
      x={x}
      y={y}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type CustomPieChartProps = {
  width: number;
  height: number;
};

const CustomPieChart = ({ width, height }: CustomPieChartProps) => {
  return (
    <PieChart height={height} width={width}>
      <Pie
        data={data}
        dataKey="value"
        endAngle={-280}
        fill="#8884d8"
        label={renderCustomizedLabel}
        labelLine={false}
        outerRadius={110}
        startAngle={80}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke="black"
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CustomPieChart;
