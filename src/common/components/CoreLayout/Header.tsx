import classNames from "classnames";

import { Button } from "@/common/components/Button";
import { ChevronDownIcon, LogoIcon } from "@/common/components/CustomIcon";
import { shortenWalletAddress } from "@/common/utils/string";

interface Props {
  className?: string;
  address?: string;
  openWalletModal: () => void;
}

const Header = ({ className, address, openWalletModal }: Props) => {
  return (
    <header
      className={classNames(
        className,
        "flex items-center justify-between px-12 py-5"
      )}
    >
      <LogoIcon />
      <nav>
        <ul className="flex items-center gap-8 text-base leading-5 text-white">
          <li>
            <a href="#">Free Credit Report</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <Button
              className="text-sm font-semibold"
              rightIcon={address ? <ChevronDownIcon /> : undefined}
              variant="outline"
              onClick={openWalletModal}
            >
              {address
                ? shortenWalletAddress({ walletAddress: address })
                : "GET STARTED"}
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
