"use client";
import { Box } from "@mui/material";
import SongSubmissions from "@/components/SongSubmissions";
import { useContext } from "react";
import { SongContext } from "@/context/SongContext";

export default function Home() {
  const { fetchSongSubmissions } = useContext(SongContext);

  return (
    <>
      {/* TODO: cheap fix with height on line 10, property subtrack of nav height and
      standardize */}
      <Box height={"87vh"} display={"flex"} justifyContent={"center"}>
        <SongSubmissions fetchRequest={fetchSongSubmissions} />
      </Box>
    </>
  );
}
