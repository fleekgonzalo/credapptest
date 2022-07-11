import Image from "next/image";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "@/common/components/Card";
import CustomPieChart from "@/common/components/CustomPieChart";

const ICON_SIZE = 24;
type AssetsDataType = {
  name: string;
  value: number;
};

type ReportAssetsProps = {
  data: AssetsDataType[];
};

const ReportAssets = ({ data }: ReportAssetsProps) => {
  return (
    <Card childWrapperClass="p-8 pb-[18px]" className="grow md:w-1/2">
      <h2 className="font-bold text-xl leading-5">Assets</h2>
      <div className="h-[223px] -mt-3">
        <AutoSizer>
          {({ width, height }) => (
            <CustomPieChart height={height} width={width} />
          )}
        </AutoSizer>
      </div>
      <div className="flex w-full mt-5 justify-between">
        {data.map((asset) => {
          return (
            <div key={asset.name} className="flex flex-col">
              <div className="flex gap-2 mb-[6px]">
                <Image
                  alt="asset"
                  height={ICON_SIZE}
                  src={`/image/${asset.name}_small_icon.png`}
                  width={ICON_SIZE}
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
