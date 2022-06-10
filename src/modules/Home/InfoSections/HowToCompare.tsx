import { StarIcon } from "@/common/components/CustomIcon";
import InfoCard from "@/modules/Home/InfoSections/InfoCard";

const HowToCompare = () => {
  return (
    <InfoCard headingText="how you compare">
      <div className="flex items-center gap-2.5">
        <div>
          <StarIcon className="text-white stroke-current" />
        </div>
        <p className="text-base">
          Your score is <span className="font-bold">Excellent </span> and{" "}
          <span className="font-bold">better than 80%</span> of accounts!
        </p>
      </div>
    </InfoCard>
  );
};

export default HowToCompare;
