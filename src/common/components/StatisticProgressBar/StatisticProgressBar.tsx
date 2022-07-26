import classNames from "classnames";
import React from "react";

import { getTailwindColor } from "@/styles/theme";

type Props = {
  value: number;
  background?: string;
  className?: string;
  percentile: string;
};
const getProgressColor = (value: number) => {
  if (value >= 90) {
    return getTailwindColor("green-chart");
  } else if (value >= 70) {
    return getTailwindColor("orange");
  } else if (value >= 40) {
    return getTailwindColor("yellow");
  }
  return getTailwindColor("red");
};

const ProgressBar = ({ value, background, className, percentile }: Props) => {
  if (!value) {
    return (
      <div className="w-full h-7 rounded-full relative bg-cred-dark-purple pl-4 pt-2 text-xs text-[#A8AECD]">
        No data
      </div>
    );
  }

  if (value < 0) {
    return (
      <div className="w-full h-7 rounded-full relative bg-cred-dark-purple pl-2 text-cred-red">
        <span className="font-bold">{value.toLocaleString()}</span>
        <span className="ml-2 text-xs">{`--th %ile`}</span>
      </div>
    );
  }

  return (
    <div
      className={classNames("w-full h-7 rounded-full relative", className)}
      style={{
        backgroundColor: background || getTailwindColor("dark-purple"),
      }}
    >
      <div
        className="h-7 rounded-full pl-2"
        style={{
          width: `${percentile}%`,
          backgroundColor: getProgressColor(+percentile),
        }}
      ></div>
      <div
        className={classNames("absolute top-0 font-bold", {
          "left-1": value > 50,
          "text-black": value > 50,
          "right-1": value < 50,
        })}
      >
        {value.toLocaleString()}
        <span className="ml-2 text-xs">{`${percentile}th %ile`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
