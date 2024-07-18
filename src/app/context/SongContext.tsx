import { createContext } from "react";
import { songSubmissionCard } from "../types/showTypes";
import React from "react";

export type SongContextProps = {
  songSubmissions: songSubmissionCard[];
  setSongSubmissions: React.Dispatch<React.SetStateAction<songSubmissionCard[]>>;
  fetchSubmissions: () => Promise<void>;
};

export const SongContext = createContext<SongContextProps>({} as SongContextProps);
