import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import { useAccount } from "wagmi";

import { DataType } from "@/common/components/AreaChart/AreaChart";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

const AreaChart = dynamic(
  () => import("@/common/components/AreaChart/AreaChart")
);

interface Props {
  animationDuration?: number;
}

const monthNames = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};

const YourCredHistory = ({ animationDuration }: Props) => {
  const { data: account } = useAccount();
  const url = account?.address
    ? getApiUrl({
        address: account?.address,
        endpoint: "score/history/address/",
      })
    : null;

  const {
    data: historyData,
    error: historyError,
    loading: historyLoading,
  } = useFetcher(url);

  if (!historyData || historyLoading) {
    return (
      <InfoCard headingText={<Skeleton width={160} />}>
        <div className="min-h-[120px] text-xs">
          <img alt="loading" src="/image/loading_cred_history.png" />
        </div>
      </InfoCard>
    );
  }

  const isNoHistory =
    historyData.length === 0 ||
    !Array.isArray(historyData) ||
    historyData.every((data) => data.value === null);
  if (isNoHistory) {
    return (
      <InfoCard headingText="your cred history">
        <div className="min-h-[120px]">No history</div>
      </InfoCard>
    );
  }

  // sorting the data by dates
  const sortedData = historyData.sort(function (a, b) {
    // converting into date string
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    return +aDate - +bDate;
  });

  // grouping the data by month
  const monthGroup = sortedData.reduce(function (r, o) {
    const monthNumber = o.date.split("-")[1];
    const monthName = monthNames[monthNumber];

    r[monthName] = o;
    return r;
  }, {});

  // converting the above grouped data into an array of objects
  const data: DataType[] = Object.keys(monthGroup).map((month) => {
    return {
      value: monthGroup[month].value,
      xAxis: month,
    };
  });

  // showing the data for last 3 months
  const slicedData = data.slice(-3);

  return (
    <InfoCard headingText="your cred history">
      {/* min height here fixes layout shifts */}
      <div className="min-h-[120px]">
        <AreaChart animationDuration={animationDuration} data={slicedData} />
      </div>
    </InfoCard>
  );
};

export default YourCredHistory;
