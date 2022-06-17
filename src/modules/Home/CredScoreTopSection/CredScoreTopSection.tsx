import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import { Card } from "@/common/components/Card";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { CircularCredScoreProgressBar } from "@/modules/Home/CredScoreTopSection/CircularCredScoreProgressBar";
import { InfoSections } from "@/modules/Home/CredScoreTopSection/InfoSections";

export const CredScoreTopSection = () => {
  const minValue = 300;
  const maxValue = 1000;
  const ANIMATION_DURATION = 1000; // in order to match the duration for cred score circular progress & Cred History Chart
  const { data: account } = useAccount();

  // to avoid duplication of toast
  const hasToastRendered = useRef<boolean>();

  const url = account?.address
    ? getApiUrl({
        address: "0x4242616070eb6c8495ea46f1de3a423c2c9c87a3",
        endpoint: "score/address/",
      })
    : null;

  const {
    data: credScoreData,
    error: credScoreError,
    loading: credScoreLoading,
  } = useFetcher(url);

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
              animationDuration={ANIMATION_DURATION}
              maxValue={maxValue}
              minValue={minValue}
              value={credScoreData?.value || null}
              valueRating={credScoreData?.value_rating || null}
            />
          </Card>
        </section>
        {credScoreData?.value && (
          <section className="lg:max-w-[352px] flex flex-col gap-4">
            <InfoSections animationDuration={ANIMATION_DURATION} />
          </section>
        )}
      </div>
    </>
  );
};

export default CredScoreTopSection;
