"use client";
import { Box } from "@mui/material";
import Nav from "./components/Nav";
import SongSubmissions from "./components/SongSubmissions";
import { getAllSongSubmissions } from "./services/phishin";
import { useContext } from "react";
import { SongContext } from "../app/context/SongContext";

export default function Home() {
  const { setSongSubmissions } = useContext(SongContext);
  const fetchSubmissions = async () => {
    const allSubmissions = await getAllSongSubmissions();
    setSongSubmissions(allSubmissions);
  };

  return (
    <>
      <Nav />
      {/* TODO: cheap fix with height on line 10, property subtrack of nav height and
      standardize */}
      <Box height={"87vh"} display={"flex"} justifyContent={"center"}>
        <SongSubmissions fetchRequest={fetchSubmissions} />
      </Box>
    </>
  );
}
