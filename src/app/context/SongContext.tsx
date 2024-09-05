import { createContext } from "react";
import { songSubmissionCard } from "@/types/showTypes";
import React from "react";

export type SongContextProps = {
  songSubmissions: songSubmissionCard[];
  setSongSubmissions: React.Dispatch<React.SetStateAction<songSubmissionCard[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
};

export const SongContext = createContext<SongContextProps>({} as SongContextProps);
