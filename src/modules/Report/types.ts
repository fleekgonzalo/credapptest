import { ReportAddressResult, ReportAssetResult } from "@/types/api";

export type MetricConfig = {
  name: string;
  color: string;
};
export type ReportAddressFetch = {
  data: ReportAddressResult;
  error: unknown;
  loading: boolean;
};
export type AssetAddressFetch = {
  data: ReportAssetResult;
  error: unknown;
  loading: boolean;
};
