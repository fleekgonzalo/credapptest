import useFetcher from "@/common/hooks/useFetcher";
import getCredColor from "@/common/utils/getCredColor";
import { getApiUrl } from "@/common/utils/string";

import CreditFactor from "./CreditFactor";

type CreditFactorsProps = {
  account: any;
};
const factorNames = [
  "Length of credit history",
  "New Credit",
  "Credit Mix",
  "Amounts Owed",
  "Account Age",
  "Payment History",
];
type Error422Response = {
  error: string;
  status_code: number;
};

export const CreditFactors = ({ account }: CreditFactorsProps) => {
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

  if (credFactorLoading) {
    return <p className="text-xs">Loading...</p>;
  }

  if (credFactorError) {
    let errorMsg = "Error loading data";
    if (credFactorError?.response?.status === 422) {
      errorMsg = (credFactorError.response.data as Error422Response).error;
    }
    return (
      <section className="mt-12">
        <h2 className="mb-6 font-bold">Credit factors</h2>
        <div>
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {factorNames.map((data, index) => {
              return (
                <CreditFactor
                  key={`credit-factor-${index}`}
                  link="#"
                  primaryText={data}
                  secondaryText={errorMsg}
                  variant="red"
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="mb-6 font-bold">Credit factors</h2>
      <div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {credFactorData?.report?.factors?.map((data, index) => {
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
          })}
        </div>
      </div>
    </section>
  );
};

export default CreditFactors;
