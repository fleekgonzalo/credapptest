import { useMemo } from "react";
import {
  Area,
  AreaChart as Chart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface DataType {
  [key: string]: number | string;
}

interface AreaChartProps {
  data: DataType[];
  width?: number;
  height?: number;
  yAxisTickCount?: number;
  animationDuration?: number;
  metrics: MetricStyle[];
}

type MetricStyle = {
  metricName: string;
  strokeColor: string;
  gradientFrom?: string;
  gradientTo?: string;
  color: string;
};
const yAxisTickFormater = (value: number, index: number) => {
  if (value > 1000) {
    const remain = value / 1000;
    return `$${remain}k`;
  }
  return `$${value}`;
};
const StackedAreaChart = ({
  data,
  width,
  height,
  yAxisTickCount,
  animationDuration = 1000,
  metrics,
}: AreaChartProps) => {
  const memoData = useMemo(() => data, [data]);

  return (
    <Chart data={memoData} height={height} width={width}>
      <XAxis
        axisLine={false}
        dataKey="xAxis"
        domain={["dataMin", "dataMax"]}
        id={`x-axis`}
        interval="preserveStartEnd"
        stroke="#C6C6C6"
        tick={{ fontSize: 11 }}
        tickCount={3}
        tickLine={false}
        tickMargin={6}
      />
      <YAxis
        axisLine={false}
        domain={[0, "auto"]}
        orientation="left"
        stroke="#C6C6C6"
        strokeWidth="0.2px"
        style={{ fontWeight: "600" }}
        tick={{ fontSize: 11 }}
        tickCount={yAxisTickCount || 5}
        tickFormatter={yAxisTickFormater}
        tickLine={false}
      />
      <defs>
        {metrics.map((metric) => (
          <linearGradient
            key={metric.metricName}
            id={`color-${metric.metricName}`}
            x1="0"
            x2="100%"
            y1="0"
            y2="0"
          >
            <stop offset="0%" stopColor={metric.gradientFrom} />
            <stop offset="100%" stopColor={metric.gradientTo} />
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid opacity="0.2" stroke="#ffffff" strokeDasharray="2 2" />
      <Tooltip />
      {metrics.map((metric) => (
        <Area
          key={metric.metricName}
          animationDuration={animationDuration || 1000}
          dataKey={metric.metricName}
          fill={`url(#color-${metric.metricName})`}
          fillOpacity={0.6}
          stackId={1}
          stroke={metric.strokeColor}
          strokeWidth="3px"
        />
      ))}
    </Chart>
  );
};

export default StackedAreaChart;
