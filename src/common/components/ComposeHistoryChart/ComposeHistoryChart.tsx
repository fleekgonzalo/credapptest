import { useMemo } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { months } from "@/constant/reportData";

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
  fillColor: string;
  color: string;
};
const yAxisTickFormater = (value: number, index: number) => {
  if (Math.abs(value) > 1000) {
    const remain = Math.round(value / 1000);
    return `$${remain}k`;
  }
  return `$${value}`;
};
export const ComposeHistoryChart = ({
  data,
  width,
  height,
  yAxisTickCount = 5,
  animationDuration = 1000,
  metrics,
}: AreaChartProps) => {
  const memoData = useMemo(() => data || [], [data]);
  const yDomain = data ? ["auto", "dataMax + 1000"] : [0, 200000];

  console.log(data);

  return (
    <ComposedChart data={memoData} height={height} width={width}>
      <XAxis
        axisLine={false}
        dataKey="xAxis"
        domain={data ? null : months}
        id={`x-axis`}
        padding={{ left: 0, right: 0 }}
        stroke="#C6C6C6"
        tick={{ fontSize: 11 }}
        tickLine={false}
      />
      <YAxis
        axisLine={false}
        domain={yDomain}
        orientation="left"
        stroke="#C6C6C6"
        strokeWidth="0.2px"
        style={{ fontWeight: "600" }}
        tick={{ fontSize: 11 }}
        tickCount={yAxisTickCount}
        tickFormatter={yAxisTickFormater}
        tickLine={false}
      />
      <CartesianGrid opacity="0.2" stroke="#ffffff" strokeDasharray="2 2" />
      <Tooltip />
      {!data ? null : (
        <>
          <ReferenceLine stroke="white" y={0} />
          <Bar barSize={30} dataKey="asset">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.asset > 0 ? "#45aa77" : "#aa1527"}
                strokeWidth={index === 2 ? 4 : 1}
              />
            ))}
          </Bar>
          {metrics.slice(0, 3).map((metric) => (
            <Line
              key={metric.metricName}
              animationDuration={animationDuration || 1000}
              dataKey={metric.metricName}
              fillOpacity={0.6}
              stroke={metric.fillColor}
              strokeWidth="3px"
            />
          ))}
        </>
      )}
    </ComposedChart>
  );
};
