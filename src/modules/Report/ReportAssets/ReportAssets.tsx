import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "@/common/components/Card";
import CustomPieChart from "@/common/components/CustomPieChart";
import { ReportAssetResult } from "@/types/api";

import { extractAssetAPIData } from "../helpers";
import { InfoWithTooltip } from "../InfoWithTooltip";
import { assetsData } from "../report.constant";

const ICON_SIZE = 24;

const LoadingCollateral = () => {
  return (
    <Card className="grow md:w-1/2">
      <Skeleton width={64} />
      <div className="flex justify-center">
        <Skeleton circle height={223} width={223} />
      </div>
      <div className="flex justify-around mt-2">
        {Array(4)
          .fill(1)
          .map((_, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="flex gap-x-2">
                  <Skeleton circle height={10} width={10} />
                  <Skeleton width={48} />
                </div>
                <Skeleton width={64} />
              </div>
            );
          })}
      </div>
    </Card>
  );
};

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
  let chartData = assetsData;

  const handleImgNotfound = (e) => {
    const img = e.target;
    // add fallback image src here for unsupported asset
    // img.src = "/image/aave.png";
  };

  if (assetAPILoading) {
    return <LoadingCollateral />;
  }
  if (assetAPIError) {
    toast.error("Fetch report asset error, use fallback data", {
      id: "fetchError",
    });
  }
  if (assetAPIData) {
    chartData = extractAssetAPIData(assetAPIData);
  }

  return (
    <Card childWrapperClass="p-8 pb-[18px]" className="grow md:w-1/2">
      <h2 className="font-bold text-xl leading-5">
        Tokens
        <InfoWithTooltip>
          <div className="w-[209px] text-xs">
            Breakdown of metrics that is allocated to the tokens you hold.
            Percent allocation displayed within chart only addresses
            non-negative values.{" "}
          </div>
        </InfoWithTooltip>{" "}
      </h2>
      <div className="h-[223px]">
        <AutoSizer>
          {({ width, height }) => (
            <CustomPieChart data={chartData} height={height} width={width} />
          )}
        </AutoSizer>
      </div>
      <div className="flex w-full mt-5 justify-around">
        {chartData.map((asset) => {
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
              <span className="font-bold">{asset.value.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
export default ReportAssets;
