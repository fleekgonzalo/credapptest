import { ReportAssetResult } from "@/types/api";

export const defaultStatisticData = [
  { metricName: "net assets", value: null, percentile: "" },
  { metricName: "deposit", value: null, percentile: "" },
  { metricName: "collateral", value: null, percentile: "" },
  { metricName: "debt", value: null, percentile: "" },
];

export const assetsData: Partial<ReportAssetResult> = {
  symbols: [
    {
      symbol: "eth",
      protocol: "etherum",
      chain: "etherum",
      debt: "41987",
      collateral: "5678",
      asset: "6322",
      deposit: "12000",
    },
    {
      symbol: "usdc",
      protocol: "etherum",
      chain: "etherum",
      debt: "21987",
      collateral: "2345",
      asset: "-1245",
      deposit: "1100",
    },
    {
      symbol: "uni",
      protocol: "etherum",
      chain: "etherum",
      debt: "11987",
      collateral: "1234",
      asset: "8535",
      deposit: "9769",
    },
    {
      symbol: "dai",
      protocol: "etherum",
      chain: "etherum",
      debt: "8987",
      collateral: "3456",
      asset: "2313",
      deposit: "5769",
    },
  ],
};
export const metricConfigs = [
  {
    name: "asset",
    label: "Net Assets",
    color: "purple-bar",
  },
  {
    name: "deposit",
    label: "Deposit",
    color: "blue-chart",
  },
  {
    name: "collateral",
    label: "Collateral",
    color: "orange",
  },
  {
    name: "debt",
    label: "Debt",
    color: "red",
  },
];
