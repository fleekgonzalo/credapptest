import { useContext } from "react";

import { LoadingFactor } from "@/common/components/Loading";
import { APIResultContext } from "@/common/context/api.context";
import getCredColor from "@/common/utils/getCredColor";

import CreditFactor from "./CreditFactor";

type CreditFactorsProps = {
  loading: boolean;
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

export const CreditFactors = ({ loading }: CreditFactorsProps) => {
  const {
    reportAddress: {
      data: reportAddressData,
      error: reportAddressError,
      loading: reportAddressLoading,
    },
  } = useContext(APIResultContext);

  if (loading || reportAddressLoading) {
    return (
      <section className="mt-12">
        <h2 className="mb-6 font-bold">Credit factors</h2>
        <div>
          <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {factorNames.map((data, index) => {
              return <LoadingFactor key={index} />;
            })}
          </div>
        </div>
      </section>
    );
  }

  if (reportAddressError) {
    let errorMsg = "Error loading data";
    if (reportAddressError?.response?.status === 422) {
      errorMsg = (reportAddressError.response.data as Error422Response).error;
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
          {reportAddressData?.report?.factors
            ?.slice(0, 6)
            .map((data, index) => {
              return (
                <CreditFactor
                  key={`credit-factor-${index}`}
                  // TODO: add link when it is available
                  link="#"
                  primaryText={data.label}
                  secondaryText={data.description}
                  variant={getCredColor(data.rating) as any}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default CreditFactors;
