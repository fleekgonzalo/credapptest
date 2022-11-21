import { Rating } from "@/common/utils/getCredColor";

type ReportFactor = {
  label: string;
  rating: Rating;
  description: string;
  learn_more?: string;
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
    created: string;
    updated: string;
    account_creation_timestamp: string;
    number_of_withdrawals: number;
    number_of_borrows: number;
    number_of_deposits: number;
    number_of_liquidations: number;
    number_of_transactions: number;
    number_of_transactions_percentile: string;
    number_of_withdrawals_1_day: number;
    number_of_withdrawals_7_day: number;
    number_of_withdrawals_30_day: number;
    number_of_withdrawals_90_day: number;
    number_of_borrows_1_day: number;
    number_of_borrows_7_day: number;
    number_of_borrows_30_day: number;
    number_of_borrows_90_day: number;
    number_of_deposits_1_day: number;
    number_of_deposits_7_day: number;
    number_of_deposits_30_day: number;
    number_of_deposits_90_day: number;
    number_of_repays_1_day: number;
    number_of_repays_7_day: number;
    number_of_repays_30_day: number;
    number_of_repays_90_day: number;
    number_of_liquidations_1_day: number;
    number_of_liquidations_7_day: number;
    number_of_liquidations_30_day: number;
    number_of_liquidations_90_day: number;
    number_of_transactions_1_day: number;
    number_of_transactions_7_day: number;
    number_of_transactions_30_day: number;
    number_of_transactions_90_day: number;
    length_of_credit_history: number;
    length_of_credit_history_percentile: string;
    number_of_borrows_30_day_percentile: string;
    number_of_borrow_pools: number;
    number_of_borrow_pools_percentile: string;
    number_of_repays: number;
    number_of_repays_percentile: string;
    debt_to_collateral_ratio: string;
    debt_to_collateral_ratio_percentile: string;
    account_age: number;
    account_age_percentile: string;
    value: number;
    decile: string;
    model_version: string;
    debt_equity_ratio: string;
    total_asset_value_eth: string;
    safety_factor_delta_1_day: string;
    safety_factor_delta_7_day: string;
    safety_factor_delta_30_day: string;
    safety_factor_delta_90_day: string;
    safety_factor_moving_average_1_day: string;
    safety_factor_moving_average_7_day: string;
    safety_factor_moving_average_30_day: string;
    safety_factor_moving_average_90_day: string;
    safety_factor_percentile: string;
    total_collateral_value_eth: string;
    collateral_value_delta_1_day: string;
    collateral_value_delta_7_day: string;
    collateral_value_delta_30_day: string;
    collateral_value_delta_90_day: string;
    collateral_value_moving_average_1_day: string;
    collateral_value_moving_average_7_day: string;
    collateral_value_moving_average_30_day: string;
    collateral_value_moving_average_90_day: string;
    total_debt_value_eth: string;
    debt_value_delta_1_day: string;
    debt_value_delta_7_day: string;
    debt_value_delta_30_day: string;
    debt_value_delta_90_day: string;
    debt_value_moving_average_1_day: string;
    debt_value_moving_average_7_day: string;
    debt_value_moving_average_30_day: string;
    debt_value_moving_average_90_day: string;
    number_of_transactions_moving_average_7_day: string;
    number_of_transactions_moving_average_30_day: string;
    number_of_transactions_moving_average_90_day: string;
    number_of_withdrawals_moving_average_7_day: string;
    number_of_withdrawals_moving_average_30_day: string;
    number_of_withdrawals_moving_average_90_day: string;
    number_of_borrows_moving_average_7_day: string;
    number_of_borrows_moving_average_30_day: string;
    number_of_borrows_moving_average_90_day: string;
    number_of_deposits_moving_average_7_day: string;
    number_of_deposits_moving_average_30_day: string;
    number_of_deposits_moving_average_90_day: string;
    number_of_repays_moving_average_7_day: string;
    number_of_repays_moving_average_30_day: string;
    number_of_repays_moving_average_90_day: string;
    number_of_liquidations_moving_average_7_day: string;
    number_of_liquidations_moving_average_30_day: string;
    number_of_liquidations_moving_average_90_day: string;
    total_deposit_value_eth: string;
    factors: ReportFactor[];
  };
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

export type ReportAssetResult = {
  account: string;
  total: AssetData[];
  chains: ChainData[];
  protocols: ProtocolData[];
  symbols: SymbolData[];
};
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
