"use client";
import React, { useState } from "react";
import { ModalContext } from "@/context/ModalContext";

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // TODO: rename this to songSubmit model or something along those lines and try to turn the openModal and closeModal variables into one line
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isProPicModalOpen, setIsProPicModalOPen] = useState(false);
  const openProPicModal = () => setIsProPicModalOPen(true);
  const closeProPicModal = () => setIsProPicModalOPen(false);

  const [isDeletePostModalOpen, setIsDeletePostModalOpen] = useState(false);
  const openDelPostModal = () => setIsDeletePostModalOpen(true);
  const closeDelPostModal = () => setIsDeletePostModalOpen(false);

  // TODO: get them to toggle like below?
  // const toggleDelPostModal = setDeletePostModal((currentState) => currentState!);
  return (
    <ModalContext.Provider
      value={{
        setIsModalOpen,
        isModalOpen,
        openModal,
        closeModal,
        setIsProPicModalOPen,
        isProPicModalOpen,
        openProPicModal,
        closeProPicModal,
        setIsDeletePostModalOpen,
        isDeletePostModalOpen,
        openDelPostModal,
        closeDelPostModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
