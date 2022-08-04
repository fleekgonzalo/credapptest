import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "@/common/components/Card";
import { ComposeHistoryChart } from "@/common/components/ComposeHistoryChart";
import { getTailwindColor } from "@/styles/theme";
import { HistoryResult } from "@/types/api";

import { metricConfigs } from "../constant";
import { generateMetricConfig } from "../helpers";
import { InfoWithTooltip } from "../InfoWithTooltip";

export const ReportHistoryChart = ({ data }: { data: HistoryResult }) => {
  const metrics = generateMetricConfig(metricConfigs);
  const reverseMetrics = metrics.map((i) => i).reverse();

  return (
    <Card className="h-[654px] md:h-[560px] pb-4">
      <div className="flex justify-between flex-col md:flex-row mb-[30px] md:mb-6">
        <h2 className="text-xl leading-[18px] font-bold tracking-widest mb-6 md:mb-0">
          Your account history
          <InfoWithTooltip>
            <div className="w-[209px] text-xs">
              Account History of aggregated metrics of holdings.
            </div>
          </InfoWithTooltip>
        </h2>
        <div className="flex gap-y-4 md:h-[18px] font-medium leading-[18px] tracking-widest flex-wrap md:flex-nowrap md:gap-3 lg:gap-6">
          {metrics.map(({ metricName, color, metricLabel }) => {
            return (
              <div
                key={metricName}
                className="leading-[18px] w-1/2 md:w-auto flex items-center"
              >
                <span
                  className={`rounded-full w-3 h-3 inline-block`}
                  style={{
                    background: data ? getTailwindColor(color) : "#ffffff33",
                  }}
                ></span>
                <div className="ml-1 text-sm leading-[18px] inline-block whitespace-nowrap">
                  {data ? (
                    <span className="capitalize">{metricLabel}</span>
                  ) : (
                    <span className="text-white/60">{metricLabel}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AutoSizer>
        {({ width, height }) => (
          <ComposeHistoryChart
            data={data}
            height={Math.min(height, 510)}
            metrics={reverseMetrics}
            width={width}
          />
        )}
      </AutoSizer>
    </Card>
  );
};
