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
  const [loading, setLoading] = useState(true);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  async function fetchSongSubmissions(filterName?: string, valueName?: string) {
    if (filterName == undefined && valueName == undefined) {
      console.log("hello this condition is run");
      const response = await fetch(`${process.env.PHAVORITES_EXPRESS}/submissions`);
      const submissions = await response.json();
      setSongSubmissions(submissions.data);
      setLoading(false);
    } else {
      const response = await fetch(
        `${process.env.PHAVORITES_EXPRESS}/submissions?filter=${filterName}&value=${valueName}`
      );
      const submissions = await response.json();
      setSongSubmissions(submissions.data);
      setLoading(false);
    }
  }

  // Purpose of this function is to refetch submissions in any of the three routes. So when deleteing or submitting a post whether you're in "/", "/song/[song]", or "/user/[user]" it will fetch the posts after the POST or DELETE. This can definitely be simplified, look into how you're refetching comments and upvotes.
  const fetchSubmissionsAllRoutes = async () => {
    if (route == "song") {
      fetchSongSubmissions("slug", paramValue);
    } else if (route == "user") {
      fetchSongSubmissions("userWhoPosted.username", paramValue);
    } else {
      fetchSongSubmissions("limit", "10");
    }
  };

  return (
    <SongContext.Provider
      value={{
        songSubmissions,
        setError,
        error,
        paramValue,
        loading,
        route,
        fetchSongSubmissions,
        setPostIdToDelete,
        postIdToDelete,
        fetchSubmissionsAllRoutes,
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
