import { createContext } from "react";
import { songSubmissionCard } from "@/types/showTypes";
import React from "react";

export type SongContextProps = {
  songSubmissions: songSubmissionCard[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPostIdToDelete: React.Dispatch<React.SetStateAction<string>>;
  postIdToDelete: string;
  error: string;
  paramValue: string | undefined;
  loading: boolean;
  route: string;
  fetchSongSubmissions: (
    filterName: string | undefined,
    valueName: string | undefined
  ) => Promise<void>;
  fetchSubmissionsAllRoutes: () => Promise<void>;
};

export const SongContext = createContext<SongContextProps>({} as SongContextProps);
