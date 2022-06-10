import { Card } from "@/common/components/Card";
import { PageHead } from "@/common/components/PageHead";
import { CircularCredScoreProgressBar } from "@/modules/Home/CircularCredScoreProgressBar";
import { CreditFactors } from "@/modules/Home/CreditFactors";
import { InfoSections } from "@/modules/Home/InfoSections";

const Home = () => {
  const minValue = 300;
  const maxValue = 1000;
  const value = 710;

  const ANIMATION_DURATION = 1000; // matched the duration with cred score circular progress

  return (
    <div className="py-16 px-5 text-white max-w-[1130px] mx-auto">
      <PageHead description="Cred Protocol" name="Home" />
      {/* Cred score top sections */}
      <h2 className="mb-6 font-bold">My Cred Score</h2>
      <div className="flex gap-8">
        <section className="grid flex-1">
          <Card darker glow>
            <CircularCredScoreProgressBar
              animationDuration={ANIMATION_DURATION}
              maxValue={maxValue}
              minValue={minValue}
              value={value}
            />
          </Card>
        </section>
        <section className="max-w-[352px] flex flex-col gap-4">
          <InfoSections animationDuration={ANIMATION_DURATION} />
        </section>

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
