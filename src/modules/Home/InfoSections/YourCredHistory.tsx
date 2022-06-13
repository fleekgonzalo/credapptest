import { useAccount } from "wagmi";

import { AreaChart, DataType } from "@/common/components/AreaChart";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import InfoCard from "@/modules/Home/InfoSections/InfoCard";

interface Props {
  animationDuration?: number;
}

const YourCredHistory = ({ animationDuration }: Props) => {
  const mockData: DataType[] = [
    { value: 860, xAxis: "Mar" },
    { value: 795, xAxis: "Apr" },
    { value: 850, xAxis: "May" },
  ];

  const { data: account } = useAccount();

  const {
    data: historyData,
    error: historyError,
    isLoading: historyLoading,
  } = useFetcher(
    getApiUrl({
      address: account?.address,
      endpoint: "score/history/address/",
    })
  );

  return (
    <InfoCard headingText="your cred history">
      {historyLoading ? (
        <div className="min-h-[120px] text-xs">Loading...</div>
      ) : (
        <AreaChart animationDuration={animationDuration} data={mockData} />
      )}
    </InfoCard>
  );
};

export default YourCredHistory;
