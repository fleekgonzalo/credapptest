import { Options, PlotSunburstOptions } from "highcharts";

import { ChainData, ProtocolData, ReportAssetResult } from "@/types/api";

const colors = ["#FF007A", "#FBAF1B", "#627EEA"];

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
export const generateProtocol = (protocols: ProtocolData[], totalDebt) => {
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
export const generateChainData = (chains: ChainData[], totalDebt) => {
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
export const generateChartData = (data: ReportAssetResult) => {
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

export const generateChartOptions = ({
  mouseOver,
  mouseOut,
  data,
}): Options => {
  return {
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
          mouseOut,
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
            mouseOver,
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
};
