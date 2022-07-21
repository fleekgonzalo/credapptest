import Highcharts, {
  Options,
  PointMouseOverCallbackFunction,
  SeriesMouseOutCallbackFunction,
} from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import Sunburst from "highcharts/modules/sunburst";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useState } from "react";

import { HandCursorIcon } from "@/common/components/CustomIcon";
import { ReportAssetResult } from "@/types/api";

import { generateChartData, generateChartOptions } from "./helpers";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  Sunburst(Highcharts);
}
type LevelData = {
  name: string;
  id: string;
  custom: {
    percent: number;
  };
};

const HoverInfo = ({ data }) => {
  return (
    <div>
      <p className="text-5xl font-bold">{data.percent} %</p>
      <p className="text-sm leading-[18px] mt-4">{data.name}</p>
    </div>
  );
};
type SunburstChartProps = {
  assetData: ReportAssetResult;
};
export const SunburstChart = ({ assetData }: SunburstChartProps) => {
  const [isShowHoverData, setShowHoverData] = useState(false);
  const [slideName, setSlideName] = useState("");
  const [slidePercent, setSlidePercent] = useState(0);

  const onMouseOut: SeriesMouseOutCallbackFunction = useCallback(() => {
    setShowHoverData(false);
  }, []);

  const onMouseOverPoint: PointMouseOverCallbackFunction = useCallback(
    (event) => {
      const data = event.target as unknown as LevelData;
      if (data.id !== "root") {
        setShowHoverData(true);
        setSlideName(data.name);
        setSlidePercent(data.custom.percent);
      } else {
        setShowHoverData(false);
      }
    },
    []
  );
  if (!assetData) {
    return <img alt="circle" src={"/image/sunburst_no_data.svg"} />;
  }
  const data = generateChartData(assetData);

  const options: Options = generateChartOptions({
    mouseOver: onMouseOverPoint,
    mouseOut: onMouseOut,
    data,
  });
  return (
    <div className="relative flex justify-center">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3  w-[180px] text-center pointer-events-none">
        {!isShowHoverData ? (
          <>
            <div className="flex justify-center opacity-60">
              <HandCursorIcon />
            </div>
            <span>Hover regions to surface allocation</span>
          </>
        ) : (
          <HoverInfo data={{ name: slideName, percent: slidePercent }} />
        )}
      </div>
    </div>
  );
};
