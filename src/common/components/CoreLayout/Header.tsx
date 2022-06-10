import classNames from "classnames";

import { Button } from "@/common/components/Button";
import {
  ChevronDownIcon,
  LogoIcon,
  MenuIcon,
} from "@/common/components/CustomIcon";
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
        "flex items-center justify-between px-6 pl-5 py-4 md:px-12 md:py-5"
      )}
    >
      <LogoIcon className="h-[40px] md:h-[48px] w-[75.4px] md:w-[90.48px]" />
      <nav className="flex items-center gap-8">
        <ul className="items-center hidden gap-8 text-base leading-5 text-white md:flex">
          <li>
            <a href="#">Free Credit Report</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
        </ul>
        <div className="flex items-center gap-2">
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
          <button
            aria-label="Close"
            className="block p-3 text-white bg-black rounded md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
