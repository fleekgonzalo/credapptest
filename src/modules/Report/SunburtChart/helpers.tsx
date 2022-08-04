import { Options, PlotSunburstOptions } from "highcharts";

import { ChainData, ProtocolData, ReportAssetResult } from "@/types/api";

const colors = ["#FF00AA", "#FBAF1B", "#627EEA"];

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
export const generateProtocol = (
  protocols: ProtocolData[],
  metricTotal,
  metric
) => {
  return protocols.map((item) => ({
    id: item.protocol,
    parent: item.chain,
    value: +item[metric],
    name: item.protocol,
    custom: {
      percent: ((parseFloat(item[metric]) / metricTotal) * 100).toFixed(2),
    },
  }));
};

export const generateChainData = (chains: ChainData[], metricTotal, metric) => {
  return chains.map((item, index) => ({
    id: item.chain,
    parent: "total",
    value: +item[metric],
    name: item.chain,
    color: colors[index],
    custom: {
      percent: ((parseFloat(item[metric]) / metricTotal) * 100).toFixed(2),
    },
  }));
};

export const generateChartData = (data: ReportAssetResult, metric: string) => {
  if (!data) {
    return null;
  }
  const total = data.total[0];
  const metricTotal = parseFloat(total[metric]);
  const chains = generateChainData(data.chains, metricTotal, metric);
  const protocols = generateProtocol(data.protocols, metricTotal, metric);
  return [
    {
      id: "root",
      name: "",
      value: null,
    },
    {
      id: "total",
      parent: "root",
      name: metric.toUpperCase(),
      value: isNaN(metricTotal) ? null : metricTotal,
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
