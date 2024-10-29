"use client";
import { Box } from "@mui/material";
import SongSubmissions from "@/components/SongSubmissions";
import { useContext } from "react";
import { SongContext } from "@/context/SongContext";

export default function Home() {
  const { fetchSongSubmissions } = useContext(SongContext);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <SongSubmissions fetchRequest={() => fetchSongSubmissions("limit", "10")} />
      </Box>
    </>
  );
}
