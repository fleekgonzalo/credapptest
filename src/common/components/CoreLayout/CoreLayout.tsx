import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect } from "wagmi";

import Header from "@/common/components/CoreLayout/Header";

import ConnectWalletModal from "./ConnectWallet/ConnectWalletModal";

export const CoreLayout = ({ children }) => {
  // modal with list of wallet providers eg: metamask, coinbase & walletconnect
  const [isMounted, setIsMounted] = useState(false);

  const { data: account } = useAccount();
  const { connect, connectors } = useConnect({
    onConnect(_) {
      // closing the modal after connected
      setIsMounted(false);
      toast.success("Connected to wallet");
    },
    onError(error) {
      toast.error(error.message, {
        duration: 750,
      });
    },
  });

  // --- Fixing Hydration failed error --- //
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(0deg, rgba(19, 24, 100, 0.2), rgba(19, 24, 100, 0.2)), #000338",
        }}
      >
        <div
          className="relative"
          style={{
            backgroundSize: "1800px",
            backgroundPosition: "top 20px center",
            backgroundImage: "url('/image/DissolveBG.jpg')",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Header
            address={account?.address}
            openWalletModal={() => setIsMounted(true)}
          />
          {children}
        </div>

        {/* FOOTER */}
      </div>
      <ConnectWalletModal
        connect={connect}
        connectors={connectors}
        isMounted={isMounted}
        setOpenModal={setIsMounted}
      />
    </>
  );
};
