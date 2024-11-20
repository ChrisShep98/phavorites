"use client";
import { Box, Typography } from "@mui/material";
import SongSubmissions from "@/components/SongSubmissions";
import { useContext } from "react";
import { SongContext } from "@/context/SongContext";

export default function Home() {
  const { fetchSongSubmissions } = useContext(SongContext);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Typography variant="overline">Recent Posts:</Typography>
        <SongSubmissions fetchRequest={() => fetchSongSubmissions("limit", "10")} />
      </Box>
    </>
  );
}
