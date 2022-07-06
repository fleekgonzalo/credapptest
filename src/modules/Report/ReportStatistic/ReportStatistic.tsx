import { Card } from "@/common/components/Card";
import ProgressBar from "@/common/components/StatisticProgressBar";

type StatisticDataType = {
  metricName: string;
  value: number;
};

type ReportStatisticProps = {
  data: StatisticDataType[];
};

const ReportStatistic = ({ data }: ReportStatisticProps) => {
  return (
    <Card childWrapperClass="p-8 pb-9" className="grow md:w-1/2">
      <h2 className="font-bold text-xl leading-5 mb-9">Statistics</h2>
      {data.map((metric) => (
        <div
          key={metric.metricName}
          className="flex mb-10 last:mb-0 items-center"
        >
          <div className="leading-5 min-w-[160px]">{`Total ${metric.metricName} value`}</div>
          <ProgressBar progress={metric.value} />
        </div>
      ))}
    </Card>
  );
};

export default ReportStatistic;
