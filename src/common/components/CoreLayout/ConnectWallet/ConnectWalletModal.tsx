import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useSignMessage } from "wagmi";

import {
  MetaMaskIcon,
  WalletConnectIcon,
} from "@/common/components/CustomIcon";
import { Divider } from "@/common/components/Divider";
import { Modal } from "@/common/components/Modal";
import { AppContext } from "@/common/context/app.context";
import { getAuthToken, getSignatureMessage } from "@/common/utils/auth";

import { Spinner } from "../../Spinner";

const ConnectWalletModal = ({ setOpenModal, isMounted }) => {
  const {
    data: address,
    isLoading: loadingConnect,
    isError: errorConnect,
  } = useAccount();
  const [message, setMessage] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const { setAuthToken } = useContext(AppContext);
  const {
    data: signature,
    isError: errorSign,
    isLoading: loadingSign,
    isSuccess: successSign,
    signMessage,
  } = useSignMessage({
    message,
  });
  const { connect, connectors } = useConnect({
    onConnect({ account }) {
      // closing the modal after connected
      toast.success("Connected to wallet", {
        duration: 750,
      });
      setLoadingAuth(true);
      getSignatureMessage(account)
        .then(setMessage)
        .finally(() => {
          setLoadingAuth(false);
        });
    },
    onError(error) {
      toast.error(error.message, {
        duration: 750,
      });
    },
  });

  const connectWallet = async (connector) => {
    await connect(connector);
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

  useEffect(() => {
    if (message) {
      signMessage();
    }
  }, [message]);

  useEffect(() => {
    if (signature && successSign) {
      setLoadingAuth(true);
      getAuthToken({ address: address.address, message, signature }).then(
        (data) => {
          setAuthToken(data.access);
          setLoadingAuth(false);
          setOpenModal(false);
        }
      );
    }
  }, [signature]);

  useEffect(() => {
    if (errorSign) {
      toast.error("Error when sign message, please contact admin");
    }
  }, [errorSign]);

  return (
    <Modal isMounted={isMounted} setOpenModal={setOpenModal}>
      {(loadingAuth || loadingConnect || loadingSign) && (
        <div className="absolute w-full h-full inset-0 z-50 flex justify-center items-center backdrop-blur-[2px]">
          <Spinner height="40px" width="40px" />
        </div>
      )}
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
