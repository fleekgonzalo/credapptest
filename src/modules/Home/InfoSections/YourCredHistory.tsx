import { useAccount } from "wagmi";

import AreaChart, { DataType } from "@/common/components/AreaChart/AreaChart";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import InfoCard from "@/modules/Home/InfoSections/InfoCard";

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
      <InfoCard headingText="your cred history">
        <div className="min-h-[120px] text-xs">Loading...</div>
      </InfoCard>
    );
  }

  if (historyData.length === 0 || !Array.isArray(historyData)) {
    return (
      <InfoCard headingText="your cred history">
        <div className="min-h-[120px] text-xs">No history</div>
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

    r[monthName] ? r[monthName].push(o) : (r[monthName] = [o]);
    return r;
  }, {});

  // converting the above grouped data into an array of objects
  const data: DataType[] = Object.keys(monthGroup).map((month) => {
    const monthData = monthGroup[month];
    // get average data of month
    const average =
      monthData.reduce((acc, cur) => acc + cur.value, 0) / monthData.length;

    return {
      value: average,
      xAxis: month,
    };
  });

  // showing the data for last 3 months
  const slicedData = data.slice(-3);

  return (
    <InfoCard headingText="your cred history">
      <AreaChart animationDuration={animationDuration} data={slicedData} />
    </InfoCard>
  );
};

export default YourCredHistory;
