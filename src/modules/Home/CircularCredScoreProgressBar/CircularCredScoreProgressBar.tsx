import { useEffect } from "react";

import { CircularProgressbar } from "@/common/components/CircularProgressbar";

import getCredPhrase from "./getCredPhrase";

interface Props {
  value: number;
  maxValue: number;
  minValue: number;
  animationDuration?: number;
}

export const CircularCredScoreProgressBar = ({
  minValue,
  maxValue,
  value,
  animationDuration = 1000,
}: Partial<Props>) => {
  console.log(value, "value");

  return (
    <div className="flex items-center justify-center h-full -mt-4 md:-mt-8">
      <CircularProgressbar
        className="max-h-[280px] min-h-[60vw] md:min-h-[auto] sm:max-h-[380px] md:max-h-[470px]"
        duration={animationDuration}
        maxValue={maxValue}
        minValue={minValue}
        value={value}
      >
        {/* middle text with cred score and cred phrase/label */}
        <text
          className="font-bold text-[18px] md:text-[16px]"
          dominantBaseline="middle"
          fill="white"
          textAnchor="middle"
          x="50%"
          y="55%"
        >
          {value ?? "-"}
        </text>
        <text
          className="text-[6.5px] md:text-[5px] font-semibold uppercase tracking-[0.18em]"
          dominantBaseline="middle"
          fill="white"
          textAnchor="middle"
          x="50%"
          y="69%"
        >
          {/* getting cred phrase with the range percent between min value and max value */}
          {value
            ? getCredPhrase(
                ((value - minValue) * 100) / (maxValue - minValue) / 100
              )
            : "no score"}
          !
        </text>

        {/* bottom middle text */}
        <text
          className="text-[4px] md:text-[2.9px] font-medium tracking-[0.18em]"
          dominantBaseline="middle"
          fill="#5D78FF"
          textAnchor="middle"
          x="50%"
          y="92%"
        >
          Provided by
        </text>
        <text
          className="text-[4px] md:text-[3px] font-extrabold tracking-[0.18em]"
          dominantBaseline="middle"
          fill="#5D78FF"
          textAnchor="middle"
          x="50%"
          y="96%"
        >
          Cred Protocol
        </text>

        {/* min value and max value range */}
        <text
          className="text-[5px] md:text-[3.5px] font-medium tracking-[0.18em]"
          dominantBaseline="middle"
          fill="white"
          opacity="0.5"
          textAnchor="middle"
          x="18%"
          y="96%"
        >
          {minValue}
        </text>
        <text
          className="text-[5px] md:text-[3.5px] font-medium tracking-[0.18em]"
          dominantBaseline="middle"
          fill="white"
          opacity="0.5"
          textAnchor="middle"
          x="82.5%"
          y="95.5%"
        >
          {maxValue}
        </text>
      </CircularProgressbar>
    </div>
  );
};

export default CircularCredScoreProgressBar;
