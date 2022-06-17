import { useAccount } from "wagmi";

import { CreditFactors } from "@/modules/Home/CreditFactors";
import { CredScoreTopSection } from "@/modules/Home/CredScoreTopSection";

const HomePage = () => {
  const { data: account } = useAccount();
  return (
    <div className="py-12 md:py-16 px-5 text-white max-w-[1130px] mx-auto">
      {/* Cred score top sections */}
      <h2 className="mb-6 font-bold">My Cred Score</h2>
      <CredScoreTopSection account={account} />

      {/* Credit factor cards */}
      <section className="mt-12">
        <h2 className="mb-6 font-bold">Credit factors</h2>
        <div>
          <CreditFactors account={account} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
