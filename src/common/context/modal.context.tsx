import { createContext } from "react";

export const ModalContext = createContext({
  isMounted: false,
  toggleMount: () => {},
});
