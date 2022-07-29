import classNames from "classnames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "@/common/components/Card";
import CustomPieChart from "@/common/components/CustomPieChart";
import { Dropdown } from "@/common/components/Dropdown";
import { ReportAssetResult } from "@/types/api";

import { extractAssetAPIData } from "../helpers";
import { InfoWithTooltip } from "../InfoWithTooltip";
import { LoadingToken } from "./LoadingToken";
import { FilterPieChart, NotEnoughDataSymbol } from "./NotEnoughData";

const ICON_SIZE = 24;

const options = [
  { label: "Net Assets", value: "asset" },
  { label: "Debt", value: "debt" },
  { label: "Collateral", value: "collateral" },
  { label: "Deposit", value: "deposit" },
];

type ReportAssetsProps = {
  assetAPIData: ReportAssetResult;
  assetAPIError: unknown;
  assetAPILoading: boolean;
};

const ReportAssets = ({
  assetAPIData,
  assetAPIError,
  assetAPILoading,
}: ReportAssetsProps) => {
  const [selectedMetric, setSelectedMetric] = useState("collateral");
  let chartData = null;
  let hasNegative = false;

  const handleImgNotfound = (e) => {
    const img = e.target;
    // add fallback image src here for unsupported asset
    img.src = "/image/asset_missing.png";
  };

  useEffect(() => {
    if (assetAPIError) {
      toast.error("Fetch report asset error", {
        id: "fetchAssetError",
      });
    }
  }, [assetAPIError]);

  if (assetAPILoading) {
    return <LoadingToken />;
  }

  if (assetAPIData) {
    chartData = extractAssetAPIData(assetAPIData, selectedMetric).sort(
      (a, b) => b.value - a.value
    );
    hasNegative = chartData.some((item) => item.value < 0);
  }

  const handleChangeMetric = (item) => {
    setSelectedMetric(item.value);
  };

  return (
    <Card childWrapperClass="p-8 pb-[18px]" className="grow md:w-1/2">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl leading-5">
          Tokens
          <InfoWithTooltip>
            <div className="w-[209px] text-xs">
              Breakdown of metrics that is allocated to the tokens you hold.
            </div>
          </InfoWithTooltip>
        </h2>
        <Dropdown
          className="-mt-1"
          options={options}
          value={selectedMetric}
          onChange={handleChangeMetric}
        />
      </div>
      {!chartData || hasNegative ? (
        <FilterPieChart hasNegative={hasNegative} />
      ) : (
        <div className="h-[223px]">
          <AutoSizer>
            {({ width, height }) => (
              <CustomPieChart data={chartData} height={height} width={width} />
            )}
          </AutoSizer>
        </div>
      )}
      <div className="flex w-full mt-5 justify-around">
        {chartData
          ? chartData.map((asset) => {
              return (
                <div key={asset.name} className="flex flex-col">
                  <div className="flex gap-2 mb-[6px]">
                    <img
                      alt="asset"
                      height={ICON_SIZE}
                      src={`/image/asset_logo_${asset.name.toUpperCase()}.png`}
                      width={ICON_SIZE}
                      onError={handleImgNotfound}
                    />
                    <span>{asset.name.toUpperCase()}</span>
                  </div>
                  <span
                    className={classNames("font-bold", {
                      "text-cred-red": asset.value < 0,
                    })}
                  >
                    {asset.value.toLocaleString()}
                  </span>
                </div>
              );
            })
          : Array(4)
              .fill(1)
              .map((_, i) => <NotEnoughDataSymbol key={i} />)}
      </div>
    </Card>
  );
};
export default ReportAssets;
