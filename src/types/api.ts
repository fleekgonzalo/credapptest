import { Rating } from "@/common/utils/getCredColor";

type ReportFactor = {
  label: string;
  rating: Rating;
  description: string;
  learn_more?: string;
};

export type ChainDataUSD = { chain: string } & AssetData;
export type ProtocolDataUSD = { protocol: string } & ChainData;
export type SymbolDataUSD = { symbol: string } & ProtocolData;
export type TokenDataUsd = { symbol: string; address: string } & AssetData;

export type ReportAssetResult = {
  chains: ChainDataUSD[];
  total: AssetDataUSD;
  protocols: ProtocolDataUSD[];
  erc20: TokenDataUsd[];
};

export type HistoryResultUSD = HistoryDataUSD[];

export type HistoryDataUSD = {
  date: string;
  debt_usd: string;
  collateral_usd: string;
  deposit_usd: string;
  asset_in_wallet_usd: string;
};

export type ReportAddressResult = {
  account: string;
  report: {
    general_report: {
      global_summary_stats: {
        total_asset_amount_usd: string; // previously total_asset_value_usd: string;
      };
      global_percentiles: {
        total_asset_amount_usd: string; // previously total_asset_percentile: string;
      };
    };
    lending_report: {
      global_summary_stats: {
        // previously total_deposit_value_usd: string;
        // also previously total_collateral_value_usd: string;
        total_deposit_amount_usd: string;
        total_borrow_amount_usd: string; // previously total_debt_value_usd: string;
      };
      global_percentiles: {
        // previously total_deposit_percentile: string;
        // also previously total_collateral_percentile: string;
        total_deposit_amount_usd: string;
        // previously total_debt_percentile: string;
        total_borrow_amount_usd: string;
      };
    };
    assets: ReportAssetResult;
    asset_history: HistoryDataUSD[];
    created: string;
    updated: string;
    factors: ReportFactor[];
  };
};

type AssetDataUSD = {
  debt_usd: string;
  collateral_usd: string;
  deposit_usd: string;
  asset_in_wallet_usd: string;
};
type AssetData = {
  debt: string;
  collateral: string;
  deposit: string;
  asset: string;
};
type HistoryData = {
  account: string;
  date: string;
  debt: string;
  collateral: string;
  deposit: string;
  asset: string;
};

export type ChainData = { chain: string } & AssetData;
export type ProtocolData = { protocol: string } & ChainData;
export type SymbolData = { symbol: string } & ProtocolData;

export type HistoryResult = HistoryData[];

type PartnerData = {
  name: string;
  logo: string;
  description: string;
  url: string;
};
export type RecommendResult = {
  account: string;
  recommendations: PartnerData[];
};
