import classNames from "classnames";
import { useState } from "react";

import { Button } from "@/common/components/Button";
import MobileMenu from "@/common/components/CoreLayout/MobileMenu";
import { ChevronDownIcon, LogoIcon } from "@/common/components/CustomIcon";
import { shortenWalletAddress } from "@/common/utils/string";

interface Props {
  className?: string;
  address?: string;
  openWalletModal: () => void;
}

export interface LinkType {
  label: string;
  link: string;
  isExternal?: boolean;
}

const LINKS: LinkType[] = [
  {
    label: "Free Credit Report",
    link: "#",
  },
  {
    label: "About",
    link: "#",
  },
  {
    label: "Careers",
    link: "#",
  },
];

const Header = ({ className, address, openWalletModal }: Props) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header
      className={classNames(
        className,
        openMenu ? "bg-cred-dark-blue md:bg-transparent" : "bg-transparent",
        "flex h-[42px] transition-color duration-[600ms] items-center justify-between px-6 pl-5 py-4 md:px-12 md:py-5"
      )}
    >
      <div>
        <LogoIcon className="h-[40px] md:h-[48px] w-[75.4px] md:w-[90.48px]" />
      </div>
      <nav className="flex items-center gap-8">
        <ul className="items-center hidden gap-8 text-base leading-5 text-white md:flex">
          {LINKS.map(({ link, label }) => {
            return (
              <li key={label}>
                <a href={link}>{label}</a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <Button
            className={classNames(
              "text-sm font-semibold md:flex",
              openMenu && "hidden"
            )}
            rightIcon={address ? <ChevronDownIcon /> : undefined}
            variant="outline"
            onClick={openWalletModal}
          >
            {address
              ? shortenWalletAddress({ walletAddress: address })
              : "GET STARTED"}
          </Button>
          <MobileMenu
            links={LINKS}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
