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

  async function fetchSongSubmissions(filterName?: string, valueName?: string) {
    if (filterName == undefined && valueName == undefined) {
      const response = await fetch(`http://localhost:8000/submissions`);
      const submissions = await response.json();
      setSongSubmissions(submissions.data);
    } else {
      const response = await fetch(
        `http://localhost:8000/submissions?filter=${filterName}&value=${valueName}`
      );
      const submissions = await response.json();
      setSongSubmissions(submissions.data);
    }
  }

  return (
    <SongContext.Provider
      value={{
        songSubmissions,
        setError,
        error,
        paramValue,
        route,
        fetchSongSubmissions,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
