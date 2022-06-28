import HowToCompare from "@/modules/Home/CredScoreTopSection/InfoSections/HowToCompare";
import ImprovementFactor from "@/modules/Home/CredScoreTopSection/InfoSections/ImprovementFactor";
import YourCredHistory from "@/modules/Home/CredScoreTopSection/InfoSections/YourCredHistory";

interface Props {
  animationDuration?: number;
}

export const InfoSections = ({ animationDuration }: Props) => {
  return (
    <>
      <HowToCompare />
      <ImprovementFactor />
      <YourCredHistory animationDuration={animationDuration} />
    </>
  );
};

export default InfoSections;
