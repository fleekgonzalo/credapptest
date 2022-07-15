import { Cell, Pie, PieChart, Tooltip } from "recharts";

import { getTailwindColor } from "@/styles/theme";

type DataType = {
  name: string;
  value: number;
};
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
  data: DataType[];
};

const CustomPieChart = ({ width, height, data }: CustomPieChartProps) => {
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
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke="black"
          />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default CustomPieChart;
