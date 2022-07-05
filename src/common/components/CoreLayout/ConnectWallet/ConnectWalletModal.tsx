import toast from "react-hot-toast";
import { useConnect } from "wagmi";

import {
  MetaMaskIcon,
  WalletConnectIcon,
} from "@/common/components/CustomIcon";
import { Divider } from "@/common/components/Divider";
import { Modal } from "@/common/components/Modal";

import CustomConnectForm from "./CustomConnectForm";

const ConnectWalletModal = ({ setOpenModal, isMounted }) => {
  const { connect, connectors } = useConnect({
    onConnect(_) {
      // closing the modal after connected
      setOpenModal(false);
      toast.success("Connected to wallet", {
        duration: 750,
      });
    },
    onError(error) {
      toast.error(error.message, {
        duration: 750,
      });
    },
  });

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
      <div className="text-center md:w-[500px] min-h-[calc(100vh-90px)] md:min-h-[auto] md:h-auto">
        {/* Heading Texts */}
        <h1 className="text-[32px] leading-10 mb-2">Connect your wallet </h1>

        <div className="md:max-h-[600px] overflow-auto">
          {metaMaskConnector?.ready && (
            <>
              <button
                className="flex items-center w-[calc(100%-20px)] gap-6 py-6 hover:opacity-80"
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
          {/* Wallet/Connectors list  */}
          <button
            className="flex items-center w-[calc(100%-20px)] gap-6 py-6 hover:opacity-80"
            onClick={() => connectWallet(walletConnectConnector)}
          >
            <WalletConnectIcon />
            <span className="font-bold text-lg leading-5 tracking-[0.01em]">
              WalletConnect
            </span>
          </button>

          <Divider />
          <button
            className="flex items-center w-[calc(100%-20px)] gap-6 pt-6 pb-2 hover:opacity-80"
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
