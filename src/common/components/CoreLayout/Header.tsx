import classNames from "classnames";
import { useState } from "react";
import { useAccount } from "wagmi";

import { Button } from "@/common/components/Button";
import MobileMenu from "@/common/components/CoreLayout/MobileMenu";
import WalletPopover from "@/common/components/CoreLayout/WalletPopover";
import { ChevronDownIcon, LogoIcon } from "@/common/components/CustomIcon";
import Popover from "@/common/components/Popover/Popover";
import { shortenWalletAddress } from "@/common/utils/string";

interface Props {
  className?: string;
  openWalletModal: () => void;
  hideNavItems?: boolean;
}

export interface LinkType {
  label: string;
  link: string;
  isExternal?: boolean;
}

const LINKS: LinkType[] = [
  {
    label: "API",
    link: "https://beta.credprotocol.com/docs/api",
  },
  {
    label: "About",
    link: "https://docs.credprotocol.com/",
  },
  {
    label: "Careers",
    link: "https://join.credprotocol.com/",
  },
];

const Header = ({ className, openWalletModal, hideNavItems }: Props) => {
  const { data: account } = useAccount();

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header
      className={classNames(
        className,
        openMenu ? "bg-cred-dark-blue md:bg-transparent" : "bg-transparent",
        "flex h-[42px] transition-colors duration-[600ms] items-center justify-between px-6 pl-5 py-4 md:px-12 md:py-5"
      )}
    >
      <div>
        <LogoIcon className="h-[40px] md:h-[48px] w-[75.4px] md:w-[90.48px]" />
      </div>
      {hideNavItems ? null : (
        <nav className="flex items-center gap-8">
          <ul className="items-center hidden gap-8 text-base leading-5 text-white md:flex">
            {LINKS.map(({ link, label }) => {
              return (
                <li key={label}>
                  <a href={link} rel="noreferrer" target="_blank">
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            {account?.address ? (
              <Popover placement="bottom-end">
                <Popover.Trigger>
                  <Button
                    className={classNames(
                      "text-sm font-semibold md:flex",
                      openMenu && "hidden"
                    )}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    {shortenWalletAddress({ walletAddress: account?.address })}
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <WalletPopover />
                </Popover.Content>
              </Popover>
            ) : (
              <Button
                className={classNames(
                  "text-sm font-semibold md:flex",
                  openMenu && "hidden"
                )}
                variant="outline"
                onClick={openWalletModal}
              >
                CONNECT WALLET
              </Button>
            )}
            <MobileMenu
              links={LINKS}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
            />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
