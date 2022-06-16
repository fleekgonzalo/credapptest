import { useEffect, useState } from "react";
import {
  configureChains,
  createClient,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Header from "@/common/components/CoreLayout/Header";

import ConnectWalletModal from "./ConnectWallet/ConnectWalletModal";

const alchemyId = process.env.ALCHEMY_ID;

// Configure chains & providers with the Alchemy provider.
const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId }),
  publicProvider(),
]);

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "cred-protocol",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

export const CoreLayout = ({ children }) => {
  // modal with list of wallet providers eg: metamask, coinbase & walletconnect
  const [isMounted, setIsMounted] = useState(false);

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
      {/* // Passing client to React Context Provider */}
      <WagmiConfig client={client}>
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
            <Header openWalletModal={() => setIsMounted(true)} />
            {children}
          </div>

          {/* FOOTER */}
        </div>
        <ConnectWalletModal isMounted={isMounted} setOpenModal={setIsMounted} />
      </WagmiConfig>
    </>
  );
};
