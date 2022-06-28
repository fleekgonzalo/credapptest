import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import { Card } from "@/common/components/Card";
import {
  NoScoreInfoSection,
  WhereMyScore,
  YourFreeCryptoCreditScore,
} from "@/common/components/NoScoreInfoSection";
import { CircularCredScoreProgressBar } from "@/modules/Home/CredScoreTopSection/CircularCredScoreProgressBar";
import { InfoSections } from "@/modules/Home/CredScoreTopSection/InfoSections";

export const CredScoreTopSection = ({ credScoreData, loading, account }) => {
  const minValue = 300;
  const maxValue = 1000;
  const ANIMATION_DURATION = 1000; // in order to match the duration for cred score circular progress & Cred History Chart

  // to avoid duplication of toast
  const hasToastRendered = useRef<boolean>();

  useEffect(() => {
    // toast to notify if no cred score
    if (
      account?.address &&
      credScoreData?.value === null &&
      !hasToastRendered.current
    ) {
      hasToastRendered.current = true;
      toast("No cred score found", {
        icon: "ⓘ",
        duration: 1600,
      });
    } else {
      hasToastRendered.current = false;
    }
  }, [account, credScoreData]);

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row">
        <section className="grid flex-1 md:min-h-[614px]">
          <Card darker glow>
            <CircularCredScoreProgressBar
              address={account?.address}
              animationDuration={ANIMATION_DURATION}
              loading={loading}
              maxValue={maxValue}
              minValue={minValue}
              value={credScoreData?.value || null}
              valueRating={credScoreData?.value_rating || null}
            />
          </Card>
        </section>
        {credScoreData?.value ? (
          <section className="lg:max-w-[352px] flex flex-col gap-4">
            <InfoSections animationDuration={ANIMATION_DURATION} />
          </section>
        ) : (
          <section className="lg:max-w-[352px] flex flex-col gap-4">
            <NoScoreInfoSection>
              {account?.address ? (
                <WhereMyScore />
              ) : (
                <YourFreeCryptoCreditScore />
              )}
            </NoScoreInfoSection>
          </section>
        )}
      </div>
    </>
  );
};

export default CredScoreTopSection;
