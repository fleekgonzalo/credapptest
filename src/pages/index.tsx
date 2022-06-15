import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

import { Card } from "@/common/components/Card";
import { PageHead } from "@/common/components/PageHead";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { CircularCredScoreProgressBar } from "@/modules/Home/CircularCredScoreProgressBar";
import { CreditFactors } from "@/modules/Home/CreditFactors";
import { InfoSections } from "@/modules/Home/InfoSections";

const Home = () => {
  const minValue = 300;
  const maxValue = 1000;
  const ANIMATION_DURATION = 1000; // in order to match the duration for cred score circular progress & Cred History Chart

  const { data: account } = useAccount();

  const url = account?.address
    ? getApiUrl({
        address: account.address,
        endpoint: "score/address/",
      })
    : null;

  const {
    data: credScoreData,
    error: credScoreError,
    isLoading: credScoreLoading,
  } = useFetcher(url);

  useEffect(() => {
    // toast to notify if no cred score
    if (credScoreData?.value === null) {
      toast("No cred score found", {
        icon: "ⓘ",
        duration: 800,
      });
    }
  }, [account]);

  return (
    <div className="py-12 md:py-16 px-5 text-white max-w-[1130px] mx-auto">
      <PageHead description="Cred Protocol" name="Home" />

      {/* Cred score top sections */}
      <h2 className="mb-6 font-bold">My Cred Score</h2>
      <div className="flex flex-col gap-8 lg:flex-row">
        <section className="grid flex-1 md:min-h-[614px]">
          <Card darker glow>
            <CircularCredScoreProgressBar
              animationDuration={ANIMATION_DURATION}
              maxValue={maxValue}
              minValue={minValue}
              value={credScoreData?.value || null}
            />
          </Card>
        </section>
        {credScoreData?.value && (
          <section className="lg:max-w-[352px] flex flex-col gap-4">
            <InfoSections animationDuration={ANIMATION_DURATION} />
          </section>
        )}

        {/* Credit factor cards */}
      </div>
      <section className="mt-12">
        <h2 className="mb-6 font-bold">Credit factors</h2>
        <CreditFactors />
      </section>
    </div>
  );
};

export default Home;
