import { CoreLayout } from "@/common/components/CoreLayout";
import { PageHead } from "@/common/components/PageHead";
import { CreditFactors } from "@/modules/Home/CreditFactors";
import CredScoreTopSection from "@/modules/Home/CredScoreTopSection/CredScoreTopSection";

const Home = () => {
  return (
    <CoreLayout>
      <div className="py-12 md:py-16 px-5 text-white max-w-[1130px] mx-auto">
        <PageHead description="Cred Protocol" name="Home" />
        {/* Cred score top sections */}
        <CredScoreTopSection />
        {/* Credit factor cards */}
        <section className="mt-12">
          <h2 className="mb-6 font-bold">Credit factors</h2>
          <CreditFactors />
        </section>
      </div>
    </CoreLayout>
  );
};

export default Home;
