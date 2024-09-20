"use client";
import React, { useState } from "react";
import { songSubmissionCard } from "@/types/showTypes";
import { SongContext } from "@/context/SongContext";
import { usePathname } from "next/navigation";

export const SongContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [songSubmissions, setSongSubmissions] = useState<songSubmissionCard[]>([]);
  const [error, setError] = useState("");
  const paramValue = usePathname().split("/").pop();
  const route = usePathname().split("/")[1];

  return (
    <SongContext.Provider
      value={{
        songSubmissions,
        setSongSubmissions,
        setError,
        error,
        paramValue,
        route,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
