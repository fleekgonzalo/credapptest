import Link from "next/link";
import { useContext, useEffect } from "react";
import AutoSizer from "react-virtualized-auto-sizer";

import StackedAreaChart from "@/common/components/AreaChart/StackedAreaChart";
import { Button } from "@/common/components/Button";
import { Card } from "@/common/components/Card";
import { ChevronLeftIcon } from "@/common/components/CustomIcon";
import { APIDispatchContext } from "@/common/context/api.context";
import useFetcher from "@/common/hooks/useFetcher";
import { getApiUrl } from "@/common/utils/string";
import { reportData } from "@/constant/reportData";
import { getTailwindColor } from "@/styles/theme";

import { generateMetricConfig } from "./helpers";
import { InfoWithTooltip } from "./InfoWithTooltip";
import { metricConfigs } from "./report.constant";
import ReportAssets from "./ReportAssets";
import ReportStatistic from "./ReportStatistic";
import { SunburstChart } from "./SunburtChart";
import { ReportAddressFetch } from "./types";

type ReportPageProps = {
  address: string;
};

const ReportPage = ({ address }: ReportPageProps) => {
  const dispatch = useContext(APIDispatchContext);
  const metrics = generateMetricConfig(metricConfigs);
  const reverseMetrics = metrics.map((i) => i).reverse();

  const scoreAPI = getApiUrl({
    address,
    endpoint: "report/address/",
  });
  const assetAPI = getApiUrl({
    address,
    endpoint: "report/asset/address/",
  });

  const {
    data: credScoreData,
    error: credScoreError,
    loading: credScoreLoading,
  }: ReportAddressFetch = useFetcher(scoreAPI);

  const {
    data: assetAPIData,
    error: assetAPIError,
    loading: assetAPILoading,
  } = useFetcher(assetAPI);

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
      <h2 className="text-xl font-bold leading-[20px]">
        Your holdings
        <InfoWithTooltip>
          <div className="w-[209px] text-xs">
            <p>
              Breakdown of Holdings per metric grouped by Total, Protocols, and
              Chains.
            </p>
            <p className="mt-4">
              Collateral is a subset of Deposit and Net Assets = Deposit -
              Collateral.
            </p>
          </div>
        </InfoWithTooltip>
      </h2>
      <div className="flex justify-center mb-10">
        <SunburstChart assetData={assetAPIData} />
      </div>
      <Card className="h-[654px] md:h-[560px] pb-4">
        <div className="flex justify-between flex-col md:flex-row mb-[30px] md:mb-6">
          <h2 className="text-xl leading-[18px] font-bold tracking-widest mb-6 md:mb-0">
            Your account history
            <InfoWithTooltip>
              <div className="w-[209px] text-xs">
                Account History of aggregated metrics of holdings.
              </div>
            </InfoWithTooltip>
          </h2>
          <div className="flex gap-y-4 md:h-[18px] font-medium leading-[18px] tracking-widest flex-wrap md:flex-nowrap md:gap-3 lg:gap-6">
            {metrics.map(({ metricName, color }) => {
              return (
                <div
                  key={metricName}
                  className="leading-[18px] w-1/2 md:w-auto flex items-center"
                >
                  <span
                    className={`rounded-full w-3 h-3 inline-block`}
                    style={{ backgroundColor: getTailwindColor(color) }}
                  ></span>
                  <div className="ml-1 text-sm leading-[18px] inline-block capitalize whitespace-nowrap">
                    Total {metricName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <AutoSizer>
          {({ width, height }) => (
            <StackedAreaChart
              data={reportData}
              height={Math.min(height, 510)}
              metrics={reverseMetrics}
              width={width}
            />
          )}
        </AutoSizer>
      </Card>
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
