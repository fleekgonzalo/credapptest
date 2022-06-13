interface shortenWalletAddressType {
  walletAddress: string;
  beginningLength?: number;
  endLength?: number;
}

export const shortenWalletAddress = ({
  walletAddress,
  beginningLength = 5,
  endLength = 5,
}: shortenWalletAddressType) => {
  const beginning = walletAddress.substring(0, beginningLength);
  const end = walletAddress.substring(
    walletAddress.length - endLength,
    walletAddress.length
  );
  return `${beginning}...${end}`;
};

export const getApiUrl = ({
  address,
  endpoint,
}: {
  address: string;
  endpoint: string;
}) => {
  return `${process.env.NEXT_PUBLIC_API_URL + endpoint + address}`;
};
