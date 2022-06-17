import useFetcher from "@/common/hooks/useFetcher";
import getCredColor from "@/common/utils/getCredColor";
import { getApiUrl } from "@/common/utils/string";

import CreditFactor from "./CreditFactor";

export const CreditFactors = ({ account }) => {
  const url = account?.address
    ? getApiUrl({
        address: account.address,
        endpoint: "report/address/",
      })
    : null;

  const {
    data: credFactorData,
    error: credFactorError,
    loading: credFactorLoading,
  } = useFetcher(url);

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {!account?.address ? (
        <p className="text-xs">Please connect your wallet</p>
      ) : !credFactorData || credFactorLoading ? (
        <p className="text-xs">Loading...</p>
      ) : credFactorData.report.factors.length <= 0 ? (
        <p className="text-xs">No Cred data found</p>
      ) : (
        credFactorData.report.factors.map((data, index) => {
          return (
            <CreditFactor
              key={`credit-factor-${index}`}
              // TODO: add link when it is available
              link="#"
              primaryText={data.label}
              secondaryText={data.description}
              variant={
                data.rating === "None"
                  ? "red"
                  : (getCredColor(data.rating) as any)
              }
            />
          );
        })
      )}
    </div>
  );
};

export default CreditFactors;
