import { useState } from "react";

import { RadioButton } from "@/common/components/RadioButton";

import { InfoWithTooltip } from "../InfoWithTooltip";
import { SunburstChart } from "../SunburtChart";

const options = [
  {
    label: "Net Assets",
    value: "asset",
  },
  {
    label: "Deposit",
    value: "deposit",
  },
  {
    label: "Collateral",
    value: "collateral",
  },
  {
    label: "Debt",
    value: "debt",
  },
];
export const ReportYourHolding = ({ data }) => {
  const [metric, setMetric] = useState("asset");
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold leading-[20px]">
          Your holdings
          <InfoWithTooltip>
            <div className="w-[209px] text-xs">
              <p>
                Breakdown of Holdings per metric grouped by Total, Protocols,
                and Chains.
              </p>
              <p className="mt-4">
                Collateral is a subset of Deposit and Net Assets = Deposit -
                Collateral.
              </p>
            </div>
          </InfoWithTooltip>
        </h2>
        <div className="flex gap-x-4">
          {options.map((item) => (
            <RadioButton
              key={item.value}
              checked={item.value === metric}
              label={item.label}
              onClick={() => setMetric(item.value)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-10">
        <SunburstChart assetData={data} metric={metric} />
      </div>
    </>
  );
};
