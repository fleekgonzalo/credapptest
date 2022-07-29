import Link from "next/link";
import { useContext, useEffect } from "react";

import { Button } from "@/common/components/Button";
import { ChevronLeftIcon } from "@/common/components/CustomIcon";
import { APIDispatchContext } from "@/common/context/api.context";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";

import ReportAssets from "./ReportAssets";
import { ReportHistoryChart } from "./ReportHistoryChart";
import ReportStatistic from "./ReportStatistic";
import { ReportYourHolding } from "./ReportYourHolding";
import { AssetAddressFetch, ReportAddressFetch } from "./types";

type ReportPageProps = {
  address: string;
};

const ReportPage = ({ address }: ReportPageProps) => {
  const dispatch = useContext(APIDispatchContext);
  const scoreAPI = getApiUrl({
    address,
    endpoint: "report/address/",
  });
  const assetAPI = getApiUrl({
    address,
    endpoint: "asset/address/",
  });
  const historyAPI = getApiUrl({
    address,
    endpoint: "asset/history/address/",
  });

  const {
    data: credScoreData,
    error: credScoreError,
    loading: credScoreLoading,
  }: ReportAddressFetch = useFetcher(scoreAPI);

  const { data: historyData }: ReportAddressFetch = useFetcher(historyAPI);

  const {
    data: assetAPIData,
    error: assetAPIError,
    loading: assetAPILoading,
  }: AssetAddressFetch = useFetcher(assetAPI);

  useEffect(() => {
    if (credScoreLoading) {
      dispatch({ type: "LOADING_REPORT_ADDRESS" });
      return;
    }
    if (credScoreError || credScoreData) {
      dispatch({
        type: "SET_REPORT_ADDRESS",
        payload: { data: credScoreData, error: credScoreError },
      });
    }
  }, [credScoreData, credScoreError, credScoreLoading, dispatch]);

  return (
    <div className="py-12 md:py-16 px-5 max-w-[1130px] mx-auto">
      <Link href="/">
        <Button className="text-sm font-medium leading-[14px] pt-0 pb-0 pl-0 pr-0 mb-8">
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 flex items-center justify-center">
              <ChevronLeftIcon />
            </div>
            Back to credit score
          </div>
        </Button>
      </Link>
      <div>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold leading-[20px]">Cred Report</h2>
            <span className="tracking-[0.16em] text-sm text-cred-light-blue">
              <span className="font-medium">powered by</span>
              <span className="font-extrabold"> Cred Protocol</span>
            </span>
          </div>
          {/* <div>
            <Button
              className="text-sm font-semibold pt-[8.5px] pb-[8.5px] px-3 leading-[15px] tracking-[0.02em] rounded-[6px]"
              variant="primary"
            >
              DOWNLOAD YOUR REPORT
            </Button>
          </div> */}
        </div>
      </div>
      <hr className="my-8 text-white/20" />
      <ReportYourHolding data={assetAPIData} />
      <ReportHistoryChart data={null} />
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <ReportStatistic />
        <ReportAssets
          assetAPIData={assetAPIData}
          assetAPIError={assetAPIError}
          assetAPILoading={assetAPILoading}
        />
      </div>
    </div>
  );
};

export default ReportPage;
