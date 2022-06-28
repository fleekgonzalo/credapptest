import Link from "next/link";
import React from "react";

import { ChevronRightIcon } from "../CustomIcon";

type PartnerCardProps = {
  logoName: string;
  label: string;
  link: string;
  desc: string;
};

const PartnerCard = (props: PartnerCardProps) => {
  const { label, logoName, link, desc } = props;
  return (
    <div className="max-w-sm overflow-hidden rounded-xl border-cred-border border-2">
      <img alt="partner-brand" className="w-full" src={`/image/${logoName}`} />
      <div className="px-6 py-4 min-h-[108px]">
        <div className="font-bold text-xl mb-2">{label}</div>
        <p className="text-base">{desc}</p>
      </div>
      <div className="px-6 pb-6 cursor-pointer">
        <Link href={link}>
          <div className="flex gap-2 leading- items-start text-cred-light-blue font-sp tracking-wider">
            <span className="font-bold">Get started</span>
            <ChevronRightIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PartnerCard;
