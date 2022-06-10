import { useEffect, useState } from "react";
import {
  Area,
  AreaChart as Chart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { CustomizedDot } from "./CustomizedDot";

export interface DataType {
  xAxis: string | number;
  value: number;
}

interface AreaChartProps {
  data: DataType[];
  gradientFrom?: string;
  gradientTo?: string;
  strokeColor?: string;
  width?: number;
  height?: number;
  yAxisTickCount?: number;
  animationDuration?: number;
}

export const AreaChart = ({
  data,
  gradientFrom,
  gradientTo,
  strokeColor,
  width,
  height,
  yAxisTickCount,
  animationDuration = 1000,
}: AreaChartProps) => {
  // Fixing Hydration failed error
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return;
  }

  return (
    <Chart
      data={data}
      height={height || 125}
      margin={{
        top: 10,
        left: 15,
        right: 10,
      }}
      width={width || 320}
    >
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
        domain={["auto", "auto"]}
        orientation="right"
        stroke="#C6C6C6"
        strokeWidth="0.2px"
        style={{ fontWeight: "600" }}
        tick={{ fontSize: 11 }}
        tickCount={yAxisTickCount || 3}
        tickLine={{
          stroke: "#ffffff",
          opacity: 0.2,
          strokeDasharray: "2 2",
          strokeWidth: "1px",
        }}
        tickMargin={6}
        tickSize={20}
      />
      <defs>
        <linearGradient id="colorValue" x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="20%"
            stopColor={gradientFrom || "rgba(96, 255, 93, 0.17)"}
          />
          <stop
            offset="100%"
            stopColor={gradientTo || "rgba(96, 255, 93, 0.01)"}
          />
        </linearGradient>
      </defs>
      <CartesianGrid
        opacity="0.2"
        stroke="#ffffff"
        // we are overriding the dash array from vertical cartesian lines (so that it has solid lines)
        // see overrides.scss
        strokeDasharray="2 2"
      />

      <Area
        animationDuration={animationDuration || 1000}
        dataKey="value"
        dot={<CustomizedDot lastElementIndex={data.length - 1} />}
        fill="url(#colorValue)"
        fillOpacity={1}
        stroke={strokeColor || "#60FF5D"}
        strokeWidth="2px"
        type="monotone"
      />
    </Chart>
  );
};

export default AreaChart;
