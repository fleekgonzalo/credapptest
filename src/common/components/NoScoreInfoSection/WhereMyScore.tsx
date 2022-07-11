import InfoCard from "@/modules/Home/CredScoreTopSection/InfoSections/InfoCard";

import { Button } from "../Button";

export const WhereMyScore = () => {
  return (
    <InfoCard headingText="where's is my score?">
      <div className="flex flex-col gap-y-5 tracking-wide">
        <p>
          Your Cred Score is based on your history of activity interacting with
          lending protocols and crypto-currencies.
        </p>
        <p>
          Once you have enough activity, you{"'"}ll automatically get a score
          that{"'"}ll help you manage your on-chain finances.
        </p>
        <Button className="font-semibold px-[11.5px]" variant="primary">
          TELL ME WHEN MY SCORE IS READY
        </Button>
      </div>
    </InfoCard>
  );
};
