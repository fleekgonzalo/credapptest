import { createContext } from "react";

export const ModalContext = createContext({
  id: "",
  isMounted: false,
  openModal: (id: string) => {},
  closeModal: (id: string) => {},
});
