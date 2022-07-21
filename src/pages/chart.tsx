import Highcharts, {
  Options,
  PlotSunburstOptions,
  PointMouseOverCallbackFunction,
  SeriesMouseOutCallbackFunction,
} from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import Sunburst from "highcharts/modules/sunburst";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useState } from "react";

import { HandCursorIcon } from "@/common/components/CustomIcon";
import { PageHead } from "@/common/components/PageHead";
import { ChainData, ProtocolData, ReportAssetResult } from "@/types/api";

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
const fakeData = {
  account: "0xc0de8b71d3a45bc2586648a74a37cadc9329b550",
  total: [
    {
      debt: "1583.96000",
      collateral: "2274.78000",
      deposit: "2290.98000",
      asset: "1728.68300",
    },
  ],
  chains: [
    {
      chain: "ethereum",
      debt: "1025.22000",
      collateral: "1428.01000",
      deposit: "1524.10000",
      asset: "1372.01000",
    },
    {
      chain: "polygon",
      debt: "558.74000",
      collateral: "846.77000",
      deposit: "766.88000",
      asset: "356.67300",
    },
  ],
  protocols: [
    {
      chain: "ethereum",
      protocol: "Aave",
      debt: "167.58000",
      collateral: "657.46000",
      deposit: "755.55000",
      asset: "786.46000",
    },
    {
      chain: "polygon",
      protocol: "Aurox ",
      debt: "558.74000",
      collateral: "846.77000",
      deposit: "766.88000",
      asset: "356.67300",
    },
    {
      chain: "ethereum",
      protocol: "Compound",
      debt: "857.64000",
      collateral: "770.55000",
      deposit: "768.55000",
      asset: "585.55000",
    },
  ],
  symbols: [
    {
      chain: "ethereum",
      protocol: "Aave",
      symbol: "USDC",
      debt: "24.23000",
      collateral: "422.23000",
      deposit: "532.23000",
      asset: "353.23000",
    },
    {
      chain: "ethereum",
      protocol: "Aave",
      symbol: "ETH",
      debt: "143.35000",
      collateral: "235.23000",
      deposit: "223.32000",
      asset: "433.23000",
    },
    {
      chain: "ethereum",
      protocol: "Compound",
      symbol: "USDC",
      debt: "532.32000",
      collateral: "535.32000",
      deposit: "533.23000",
      asset: "532.32000",
    },
    {
      chain: "polygon",
      protocol: "Aurox ",
      symbol: "ETH",
      debt: "435.32000",
      collateral: "493.34000",
      deposit: "234.53000",
      asset: "123.35000",
    },
    {
      chain: "polygon",
      protocol: "Aurox ",
      symbol: "USDC",
      debt: "123.42000",
      collateral: "353.43000",
      deposit: "532.35000",
      asset: "233.32300",
    },
    {
      chain: "ethereum",
      protocol: "Compound",
      symbol: "ETH",
      debt: "325.32000",
      collateral: "235.23000",
      deposit: "235.32000",
      asset: "53.23000",
    },
  ],
};
const commonOptions: Partial<Options> = {
  chart: {
    backgroundColor: null,
    height: 500,
    width: 500,
    spacing: [0, 0, 0, 0],
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  tooltip: {
    formatter: (): false => false,
  },
  title: {
    floating: true,
    style: {
      display: "none",
    },
  },
};
const levelOptions: Partial<PlotSunburstOptions> = {
  levels: [
    {
      level: 1,
      color: "#000338",
      levelSize: {
        unit: "weight",
        value: 4,
      },
    },
    {
      level: 2,
      color: "#60FF90",
    },
  ],
};

const colors = ["#FF007A", "#FBAF1B", "#627EEA"];

const generateProtocol = (protocols: ProtocolData[], totalDebt) => {
  return protocols.map((item) => ({
    id: item.protocol,
    parent: item.chain,
    value: +item.debt,
    name: item.protocol,
    custom: {
      percent: ((parseFloat(item.debt) / totalDebt) * 100).toFixed(2),
    },
  }));
};
const generateChainData = (chains: ChainData[], totalDebt) => {
  return chains.map((item, index) => ({
    id: item.chain,
    parent: "total",
    value: +item.debt,
    name: item.chain,
    color: colors[index],
    custom: {
      percent: ((parseFloat(item.debt) / totalDebt) * 100).toFixed(2),
    },
  }));
};
const generateChartData = (data: ReportAssetResult) => {
  const total = data.total[0];
  const chains = generateChainData(data.chains, parseFloat(total.debt));
  const protocols = generateProtocol(data.protocols, parseFloat(total.debt));
  return [
    {
      id: "root",
      name: "",
      value: null,
    },
    {
      id: "total",
      parent: "root",
      name: "Debt",
      value: parseFloat(total.debt),
      custom: {
        percent: 100,
      },
    },
    ...chains,
    ...protocols,
  ];
};
const HoverInfo = ({ data }) => {
  return (
    <div>
      <p className="text-5xl font-bold">{data.percent} %</p>
      <p className="text-sm leading-[18px]">{data.name}</p>
    </div>
  );
};
const App = () => {
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
  const data = generateChartData(fakeData);
  const options: Options = {
    ...commonOptions,
    plotOptions: {
      sunburst: {
        borderWidth: 10,
        opacity: 0.1,
        dataLabels: {
          style: {
            display: "none",
          },
        },
        ...levelOptions,
        events: {
          mouseOut: onMouseOut,
        },
      },
    },

    series: [
      {
        type: "sunburst",
        startAngle: 65,
        borderColor: "#000338",
        point: {
          events: {
            mouseOver: onMouseOverPoint,
          },
        },
        states: {
          hover: {
            borderColor: "#000338",
          },
          inactive: {
            opacity: 1,
          },
        },
        data,
        cursor: "pointer",
      },
    ],
  };
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

const Chart = () => {
  return (
    <>
      <PageHead description="Cred Protocol" name="Report" />
      <App />
    </>
  );
};

export default Chart;
