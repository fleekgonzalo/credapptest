import { useContext } from "react";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import { Card } from "@/common/components/Card";
import ProgressBar from "@/common/components/StatisticProgressBar";
import { APIResultContext } from "@/common/context/api.context";

import { extractAddressAPIData } from "../helpers";
import { InfoWithTooltip } from "../InfoWithTooltip";
import { defaultStatisticData } from "../report.constant";

const LoadingStatistic = () => {
  return (
    <Card className="grow md:w-1/2">
      <Skeleton width={87} />
      <div className="flex flex-col gap-y-6">
        {Array(4)
          .fill(4)
          .map((_, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <Skeleton width={150} />
                <Skeleton borderRadius={999} height={50} width={300} />
              </div>
            );
          })}
      </div>
    </Card>
  );
};

const ReportStatistic = () => {
  let statisticData = defaultStatisticData;
  const {
    reportAddress: { data, loading, error },
  } = useContext(APIResultContext);

  if (loading) {
    return <LoadingStatistic />;
  }

  if (error) {
    toast.error(
      "Error while fetching report statistic data, fallback to default data",
      {
        id: "fetchError",
      }
    );
  }
  if (data) {
    statisticData = extractAddressAPIData(data);
  }

  return (
    <Card childWrapperClass="p-8 pb-9" className="grow md:w-1/2">
      <h2 className="font-bold text-xl leading-5 mb-9">
        Statistics
        <InfoWithTooltip>
          <div className="w-[209px] text-xs">
            Total values of holding metrics supplemented with the percentile in
            which you lie per metric
          </div>
        </InfoWithTooltip>
      </h2>
      {statisticData.map((metric) => (
        <div
          key={metric.metricName}
          className="flex mb-10 last:mb-0 items-center"
        >
          <div className="leading-5 min-w-[160px]">{`Total ${metric.metricName} value`}</div>
          <ProgressBar percentile={metric.percentile} progress={metric.value} />
        </div>
      ))}
    </Card>
  );
};

export default ReportStatistic;
