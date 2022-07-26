export const defaultStatisticData = [
  { metricName: "net asset", value: NaN, percentile: "90" },
  { metricName: "deposit", value: -123456, percentile: "80" },
  { metricName: "collateral", value: 53456, percentile: "60" },
  { metricName: "debt", value: 43456, percentile: "80" },
];

export const assetsData = [
  { name: "eth", value: 41987 },
  { name: "usdc", value: 16791 },
  { name: "uni", value: 58769 },
  { name: "dai", value: 50374 },
];
export const metricConfigs = [
  {
    name: "asset",
    color: "green-chart",
  },
  {
    name: "deposit",
    color: "blue-chart",
  },
  {
    name: "collateral",
    color: "orange",
  },
  {
    name: "debt",
    color: "red",
  },
];
