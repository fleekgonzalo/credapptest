import { compareAsc, parse } from "date-fns";
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

import { monthMapping } from "@/constant/reportData";
import { HistoryResult } from "@/types/api";

export interface DataType {
  [key: string]: number | string;
}

interface AreaChartProps {
  data: HistoryResult;
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
const parseNum = (num: string) => {
  return isNaN(parseFloat(num)) ? null : parseFloat(num);
};
const generateHistoryData = (data: HistoryResult) => {
  if (!data) {
    return null;
  }
  const isAllNull = data.every((entry) => entry.date === null);

  if (isAllNull) {
    return null;
  }
  const dataSortedByDate = data.sort((a, b) => {
    const dayA = parse(a.date, "yyyy-MM-dd", new Date());
    const dayB = parse(b.date, "yyyy-MM-dd", new Date());
    return compareAsc(dayA, dayB);
  });

  let monthDict = dataSortedByDate.reduce((dict, dayData) => {
    const month = dayData.date.slice(0, 7);
    dict[month] = {
      asset: parseNum(dayData.asset),
      deposit: parseNum(dayData.deposit),
      collateral: parseNum(dayData.collateral),
      debt: parseNum(dayData.debt),
      date: monthMapping[month.slice(5)],
    };
    return dict;
  }, {});
  const months = Object.keys(monthDict).sort((a, b) => {
    const monthA = parse(a, "yyyy-MM", new Date());
    const monthB = parse(b, "yyyy-MM", new Date());
    return compareAsc(monthA, monthB);
  });
  return months.map((month) => monthDict[month]);
};
export const ComposeHistoryChart = ({
  data,
  width,
  height,
  yAxisTickCount = 5,
  animationDuration = 1000,
  metrics,
}: AreaChartProps) => {
  const memoData = useMemo(
    () => (!!data && data.length > 0 ? data : null),
    [data]
  );
  const yDomain = memoData ? ["auto", "dataMax + 100"] : [0, 200000];

  const chartData = generateHistoryData(memoData);
  return (
    <ComposedChart data={chartData} height={height} width={width}>
      <XAxis
        axisLine={false}
        dataKey="date"
        domain={chartData ? null : Object.values(monthMapping)}
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
      {!chartData ? null : (
        <>
          <ReferenceLine stroke="white" y={0} />
          <Bar barSize={30} dataKey="asset">
            {chartData.map((entry, index) => (
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
