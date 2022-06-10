import HowToCompare from "@/modules/Home/InfoSections/HowToCompare";
import ImprovementFactor from "@/modules/Home/InfoSections/ImprovementFactor";
import YourCredHistory from "@/modules/Home/InfoSections/YourCredHistory";

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
