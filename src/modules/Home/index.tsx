import { useAccount } from "wagmi";

import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { CreditFactors } from "@/modules/Home/CreditFactors";
import { CredScoreTopSection } from "@/modules/Home/CredScoreTopSection";

const HomePage = () => {
  const { data: account } = useAccount();

  const scoreAPI = account?.address
    ? getApiUrl({
        address: account.address,
        endpoint: "score/address/",
      })
    : null;

  const {
    data: credScoreData,
    error: credScoreError,
    loading: credScoreLoading,
  } = useFetcher(scoreAPI);

  return (
    <div className="py-12 md:py-16 px-5 text-white max-w-[1130px] mx-auto">
      {/* Cred score top sections */}
      <h2 className="mb-6 font-bold">My Cred Score</h2>
      <CredScoreTopSection
        account={account}
        credScoreData={credScoreData}
        loading={credScoreLoading}
      />

      {/* Credit factor cards */}
      <section className="mt-12">
        <h2 className="mb-6 font-bold">Start building your credit</h2>
        <div>
          <CreditFactors account={account} hasScore={!!credScoreData?.value} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
