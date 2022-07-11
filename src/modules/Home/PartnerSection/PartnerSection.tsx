import React from "react";

import PartnerCard from "@/common/components/PartnerCard";
import { partners } from "@/common/constants/partner";

export const PartnerSection = () => {
  return (
    <section className="mt-12">
      <h2 className="mb-6 font-bold">Start building your credit</h2>
      <div>
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
      </div>
    </section>
  );
};
