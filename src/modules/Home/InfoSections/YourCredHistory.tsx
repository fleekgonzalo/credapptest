import { AreaChart, DataType } from "@/common/components/AreaChart";
import InfoCard from "@/modules/Home/InfoSections/InfoCard";

interface Props {
  animationDuration?: number;
}

const YourCredHistory = ({ animationDuration }: Props) => {
  const data: DataType[] = [
    { value: 860, xAxis: "Mar" },
    { value: 795, xAxis: "Apr" },
    { value: 850, xAxis: "May" },
  ];

  return (
    <InfoCard headingText="your cred history">
      <AreaChart animationDuration={animationDuration} data={data} />
    </InfoCard>
  );
};

export default YourCredHistory;
