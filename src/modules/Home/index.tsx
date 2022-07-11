import Link from "next/link";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { CreditFactors } from "@/modules/Home/CreditFactors";
import { CredScoreTopSection } from "@/modules/Home/CredScoreTopSection";

import { PartnerSection } from "./PartnerSection";

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

  const hasScore = !!credScoreData?.value;
  return (
    <div className="py-12 md:py-16 px-5 max-w-[1130px] mx-auto">
      {/* Cred score top sections */}
      <div className="flex justify-between items-center">
        <h2 className="mb-4 font-bold text-xl leading-5">My Cred Score</h2>
        <Link href="/report">
          <Button
            className="mb-4 font-semibold rounded-[6px] tracking-[0.02em] text-sm leading-[15px] py-[8.5px] px-2"
            variant="primary"
          >
            GET REPORT
          </Button>
        </Link>
      </div>
      <CredScoreTopSection
        account={account}
        credScoreData={credScoreData}
        loading={credScoreLoading}
      />
      {!account?.address || !hasScore ? (
        <PartnerSection />
      ) : (
        <CreditFactors account={account} />
      )}
    </div>
  );
};

export default HomePage;
