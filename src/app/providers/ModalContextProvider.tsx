"use client";
import React, { useState } from "react";
import { ModalContext } from "../context/ModalContext";

export const ModalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ setIsModalOpen, isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
