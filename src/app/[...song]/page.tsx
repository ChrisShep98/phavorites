"use client";
import React, { useContext, useState } from "react";
import { SongContext } from "../context/SongContext";
import { getSpecificSongSubmissions } from "../services/phishin";
import { Box } from "@mui/material";
import RecentSubmissions from "../components/RecentSubmissions";
import Nav from "../components/Nav";

export default function SpecificSongSubmissions() {
  const { setSongSubmissions, slug } = useContext(SongContext);

  const fetchSubmissions = async () => {
    const songSubmissions = await getSpecificSongSubmissions(slug);
    setSongSubmissions(songSubmissions);
  };

  return (
    <>
      <Nav />
      <Box height={"87vh"} display={"flex"} justifyContent={"center"}>
        <RecentSubmissions fetchRequest={fetchSubmissions} />
      </Box>
    </>
  );
}
