"use client";
import React, { useContext } from "react";
import { SongContext } from "@/context/SongContext";
import { getSubmissions } from "@/services/phishin";
import { Box } from "@mui/material";
import SongSubmissions from "@/components/SongSubmissions";
import { paramValue } from "@/constants/globalVariables";

export default function SpecificSongSubmissions() {
  // the way of fetching this data via usePathname() feels like it could break easily, for instance if the url ever changes. You could configure it so it will take anything after the 2nd "/" but will leave for now. I'm also kind of curious why the native browser window object didn't work for this, maybe something to look into for curiosity sake
  const { setSongSubmissions } = useContext(SongContext);

  const fetchSubmissions = async () => {
    const singleSongSubmissions = await getSubmissions("slug", paramValue);

    setSongSubmissions(singleSongSubmissions);
  };

  return (
    <>
      <Box height={"87vh"} display={"flex"} justifyContent={"center"}>
        <SongSubmissions fetchRequest={fetchSubmissions} />
      </Box>
    </>
  );
}
