import HowToCompare from "@/modules/Home/CredScoreTopSection/InfoSections/HowToCompare";
import ImprovementFactor from "@/modules/Home/CredScoreTopSection/InfoSections/ImprovementFactor";
import YourCredHistory from "@/modules/Home/CredScoreTopSection/InfoSections/YourCredHistory";

interface Props {
  animationDuration?: number;
  account: any;
}

export const InfoSections = ({ animationDuration, account }: Props) => {
  return (
    <>
      <HowToCompare />
      <ImprovementFactor />
      <YourCredHistory
        account={account}
        animationDuration={animationDuration}
      />
    </>
  );
};

export default InfoSections;
