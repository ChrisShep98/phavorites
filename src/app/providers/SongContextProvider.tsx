"use client";
import React, { useState } from "react";
import { songSubmissionCard } from "@/types/showTypes";
import { SongContext } from "@/context/SongContext";

export const SongContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [songSubmissions, setSongSubmissions] = useState<songSubmissionCard[]>([]);
  const [error, setError] = useState("");

  return (
    <SongContext.Provider
      value={{
        songSubmissions,
        setSongSubmissions,
        setError,
        error,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
