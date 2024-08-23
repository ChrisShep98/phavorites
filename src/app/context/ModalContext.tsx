import { createContext } from "react";
import React from "react";

export type ModalContextProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
