import { useContext } from "react";

import { ChevronRightIcon } from "@/common/components/CustomIcon";
import { APIResultContext } from "@/common/context/api.context";
import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

const ImprovementFactor = () => {
  const {
    reportAddress: { data },
  } = useContext(APIResultContext);
  return (
    <InfoCard headingText="improvement factor">
      <p className="text-base">
        {data?.report.factors[data.report.factors.length - 1].description ||
          "No data"}
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
