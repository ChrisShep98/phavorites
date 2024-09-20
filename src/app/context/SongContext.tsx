import { createContext } from "react";
import { songSubmissionCard } from "@/types/showTypes";
import React from "react";

export type SongContextProps = {
  songSubmissions: songSubmissionCard[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  paramValue: string | undefined;
  route: string;
  fetchSongSubmissions: (
    filterName?: string | undefined,
    valueName?: string | undefined
  ) => Promise<void>;
};

export const SongContext = createContext<SongContextProps>({} as SongContextProps);
