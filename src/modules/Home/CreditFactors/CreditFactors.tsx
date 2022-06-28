import PartnerCard from "@/common/components/PartnerCard";
import { partners } from "@/common/constants/partner";
import useFetcher from "@/common/hooks/useFetcher";
import getCredColor from "@/common/utils/getCredColor";
import { getApiUrl } from "@/common/utils/string";

import CreditFactor from "./CreditFactor";

type CreditFactorsProps = {
  account: any;
  hasScore: boolean;
};

export const CreditFactors = ({ account, hasScore }: CreditFactorsProps) => {
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

  if (!account?.address || !hasScore) {
    return (
      <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.label}
            desc={partner.desc}
            label={partner.label}
            link={partner.link}
            logoName={partner.logoName}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
      {!credFactorData || credFactorLoading ? (
        <p className="text-xs">Loading...</p>
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
