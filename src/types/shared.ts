import { useAccount } from "wagmi";

export type WagmiAccount = Pick<ReturnType<typeof useAccount>, "data">["data"];
