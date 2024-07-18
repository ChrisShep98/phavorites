"use client";
import React, { useState } from "react";
import { songSubmissionCard } from "../types/showTypes";
import { SongContext } from "../context/SongContext";
import { getAllSongSubmissions } from "../services/phishin";

export const SongContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [songSubmissions, setSongSubmissions] = useState<songSubmissionCard[]>([]);

  const fetchSubmissions = async () => {
    const allSubmissions = await getAllSongSubmissions();

    setSongSubmissions(allSubmissions);
  };

  return (
    <SongContext.Provider
      value={{ songSubmissions, setSongSubmissions, fetchSubmissions }}
    >
      {children}
    </SongContext.Provider>
  );
};
