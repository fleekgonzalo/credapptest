import { ChevronRightIcon } from "@/common/components/CustomIcon";
import InfoCard from "@/modules/Home/InfoSections/InfoCard";

const ImprovementFactor = () => {
  return (
    <InfoCard headingText="improvement factor">
      <p className="text-base">
        Since your score is already Excellent, there are fewer areas to improve,
        however, lenders like to see experience with credit such as the number
        of borrowing pools and length of time you’ve used them.
      </p>

      <a
        className="flex items-center gap-2 mt-2 font-semibold text-cred-light-blue group hover:text-cred-soft-blue"
        href="#"
      >
        Learn more
        <span className="group-hover:translate-x-0.5 transition-transform">
          <ChevronRightIcon />
        </span>
      </a>
    </InfoCard>
  );
};

export default ImprovementFactor;
