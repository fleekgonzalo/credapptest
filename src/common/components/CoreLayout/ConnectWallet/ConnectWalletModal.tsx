import Image from "next/image";

import {
  MetaMaskIcon,
  WalletConnectIcon,
} from "@/common/components/CustomIcon";
import { Divider } from "@/common/components/Divider";
import { Modal } from "@/common/components/Modal";

import CustomConnectForm from "./CustomConnectForm";

const ConnectWalletModal = ({
  setOpenModal,
  isMounted,
  connect,
  connectors,
}) => {
  const connectWallet = (connector) => {
    connect(connector);
  };

  // metamask
  const metaMaskConnector = connectors.find((connector) => {
    return connector.name === "MetaMask";
  });

  // wallet connect
  const walletConnectConnector = connectors.find((connector) => {
    return connector.name === "WalletConnect";
  });

  // coinbase
  const coinbaseConnector = connectors.find((connector) => {
    return connector.name === "Coinbase Wallet";
  });

  return (
    <Modal isMounted={isMounted} setOpenModal={setOpenModal}>
      <div className="text-center md:max-w-[540px] h-[calc(100vh-90px)] md:h-auto">
        <div className="md:w-[90%] mx-auto">
          {/* Heading Texts */}
          <h1 className="text-[32px] leading-10 mb-2">
            Connect your digital wallet{" "}
          </h1>
          <p className="mb-8">
            Enter your eth address below or connect to your digital wallet to
            generate your cred score.
          </p>

          {/* Custom connect form */}
          <CustomConnectForm setOpenModal={setOpenModal} />

          <Divider className="mb-2" textInBetween="or" />

          {/* Wallet/Connectors list  */}
          {metaMaskConnector.ready && (
            <>
              <button
                className="flex items-center w-full gap-6 py-6 pl-2 hover:opacity-80"
                disabled={!metaMaskConnector.ready}
                onClick={() => connectWallet(metaMaskConnector)}
              >
                <MetaMaskIcon />
                <span className="font-bold text-lg leading-5 tracking-[0.01em]">
                  MetaMask
                </span>
              </button>
              <Divider />
            </>
          )}
          <button
            className="flex items-center w-full gap-6 py-6 hover:opacity-80"
            onClick={() => connectWallet(walletConnectConnector)}
          >
            <WalletConnectIcon />
            <span className="font-bold text-lg leading-5 tracking-[0.01em]">
              WalletConnect
            </span>
          </button>
          <Divider />
          <button
            className="flex items-center w-full gap-6 pt-6 pb-2 hover:opacity-80"
            onClick={() => connectWallet(coinbaseConnector)}
          >
            <img
              alt="coinbase"
              height={48}
              src="/image/coinbase.png"
              width={48}
            />
            <span className="font-bold text-lg leading-5 tracking-[0.01em]">
              Coinbase Wallet
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConnectWalletModal;
