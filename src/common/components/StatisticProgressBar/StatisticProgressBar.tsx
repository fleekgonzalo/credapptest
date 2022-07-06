import classNames from "classnames";
import React from "react";

import { getTailwindColor } from "@/styles/theme";

type Props = {
  progress: number;
  background?: string;
  className?: string;
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

const ProgressBar = ({ progress, background, className }: Props) => {
  return (
    <div
      className={classNames("w-full h-7 rounded-full", className)}
      style={{
        backgroundColor: background || getTailwindColor("dark-purple"),
      }}
    >
      <div
        className="h-7 rounded-full"
        style={{
          width: `${progress}%`,
          backgroundColor: getProgressColor(progress),
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
