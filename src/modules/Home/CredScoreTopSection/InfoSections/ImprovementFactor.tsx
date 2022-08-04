import { useContext, useState } from "react";

import { ChevronRightIcon } from "@/common/components/CustomIcon";
import { APIResultContext } from "@/common/context/api.context";
import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

const IMPROVEMENT_FACTOR_INDEX = 6;
const filterText =
  "Unfortunately, we currently don't have enough data to suggest credit scoring feedback for this wallet.";
const ImprovementFactor = () => {
  const {
    reportAddress: { data },
  } = useContext(APIResultContext);
  const [extend, setExtend] = useState(false);
  const toggleExtend = () => setExtend((s) => !s);

  if (data && data.report.factors.length < 7) {
    return (
      <InfoCard headingText="improvement factor">
        <div className="flex gap-x-2">
          <img
            alt="no token data"
            className="inline w-10 h-10"
            src="/image/no_data_circle.png"
          />
          <p className="tracking-[0.02em] font-normal">{filterText}</p>
        </div>
      </InfoCard>
    );
  }

  const texts =
    data?.report.factors[IMPROVEMENT_FACTOR_INDEX].description.split("\n");

  return (
    <InfoCard headingText="improvement factor">
      <div className="text-base flex flex-col gap-y-4">
        {extend ? (
          <div>
            {texts.map((line, i) => (
              <p key={i}>
                {line}
                {i === texts.length - 1 ? (
                  <u className="cursor-pointer ml-1" onClick={toggleExtend}>
                    Less
                  </u>
                ) : null}
              </p>
            ))}
          </div>
        ) : (
          <p>
            {texts[0]}
            <u className="cursor-pointer" onClick={toggleExtend}>
              Read more
            </u>
          </p>
        )}
      </div>

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
