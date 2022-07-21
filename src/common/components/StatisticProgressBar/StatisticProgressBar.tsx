import classNames from "classnames";
import React from "react";

import { getTailwindColor } from "@/styles/theme";

type Props = {
  progress: number;
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

const ProgressBar = ({
  progress,
  background,
  className,
  percentile,
}: Props) => {
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
          "left-1": progress > 50,
          "text-black": progress > 50,
          "right-1": progress < 50,
        })}
      >
        {progress.toLocaleString()}
        <span className="ml-2 text-xs">{`${percentile}th %ile`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
