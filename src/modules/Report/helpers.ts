import { getTailwindColor } from "@/styles/theme";
import { ReportAddressResult, ReportAssetResult } from "@/types/api";

import { MetricConfig } from "./types";

export const generateMetricConfig = (configs: MetricConfig[]) => {
  return configs.map((config) => {
    const colorString = getTailwindColor(config.color);
    return {
      color: config.color,
      metricName: config.name,
      strokeColor: colorString,
      gradientFrom: `${colorString}00`,
      gradientTo: colorString,
    };
  });
};

export const extractAddressAPIData = (data: ReportAddressResult) => {
  const {
    total_asset_value_usd,
    total_asset_percentile,
    total_deposit_percentile,
    total_debt_percentile,
    total_collateral_percentile,
    total_collateral_value_usd,
    total_deposit_value_usd,
    total_debt_value_usd,
  } = data.report;

  return [
    {
      metricName: "net asset",
      value: parseInt(total_asset_value_usd),
      percentile: total_asset_percentile,
    },
    {
      metricName: "deposit",
      value: parseInt(total_deposit_value_usd),
      percentile: total_deposit_percentile,
    },
    {
      metricName: "collateral",
      value: parseInt(total_collateral_value_usd),
      percentile: total_collateral_percentile,
    },
    {
      metricName: "debt",
      value: parseInt(total_debt_value_usd),
      percentile: total_debt_percentile,
    },
  ];
};

export const extractAssetAPIData = (
  data: ReportAssetResult,
  metric: string
) => {
  const { symbols } = data;

  return symbols.map((symbol) => ({
    name: symbol.symbol,
    value: +symbol[metric],
  }));
};
