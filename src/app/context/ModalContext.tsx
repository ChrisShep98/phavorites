import { createContext } from "react";
import React from "react";

export type ModalContextProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsProPicModalOPen: React.Dispatch<React.SetStateAction<boolean>>;
  isProPicModalOpen: boolean;
  openProPicModal: () => void;
  closeProPicModal: () => void;
};

export const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);
