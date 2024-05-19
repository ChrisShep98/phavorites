"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { years } from "../constants/shows";
import { shows } from "../types/showTypes";
import { tracks } from "../types/showTypes";
import { getTrackList } from "../services/phishin";
import { getShows } from "../services/phishin";
import Nav from "./Nav";

const UserInfo = () => {
  const { data: session } = useSession();
  const [year, setYear] = useState("");
  const [allYearShows, setAllYearShows] = useState<shows[]>([]);

  const [audioSource, setAudioSource] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [date, setDate] = useState("");
  const [trackList, setTrackList] = useState<tracks[]>([]);

  async function fetchAllShowsFromYear(year: string) {
    const yearSelected = await getShows(year);
    console.log(yearSelected.data, "data prop");
    setYear(year);
    setAllYearShows(yearSelected.data);
  }

  async function fetchTracksFromData(date: string) {
    const dateSelected = await getTrackList(date);
    setTrackList(dateSelected);
    console.log(trackList);
  }

  console.log(audioSource);

  return (
    <Stack>
      <Nav />
      <Stack alignItems={"center"}>
        <audio controls autoPlay={isPlaying} src={audioSource}></audio>
      </Stack>
      <FormControl variant="filled" sx={{ m: 10, width: "150px" }}>
        <InputLabel id="demo-simple-select-filled-label">Years</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={year}
        >
          {years.map((el) => {
            return (
              <MenuItem
                key={el}
                value={el}
                onClick={async () => fetchAllShowsFromYear(el)}
              >
                {el}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Stack m={7} flexDirection={"row"} gap={5}>
        <Stack flexDirection={"row"}>
          <Typography variant="h5">Years</Typography>
          <Stack
            overflow={"scroll"}
            maxHeight={"500px"}
            pr={2}
            sx={{ overflowX: "hidden" }}
          >
            {years.map((el) => {
              return (
                <MenuItem
                  key={el}
                  value={el}
                  onClick={async () => fetchAllShowsFromYear(el)}
                >
                  {el}
                </MenuItem>
              );
            })}
          </Stack>
          <Typography variant="h5">Shows</Typography>
          <Stack
            overflow={"scroll"}
            maxHeight={"500px"}
            pr={2}
            sx={{ overflowX: "hidden" }}
          >
            {allYearShows.map(({ id, date }) => (
              <Typography
                key={id}
                onClick={() => {
                  setDate(date);
                  fetchTracksFromData(date);
                }}
                sx={{
                  cursor: "pointer",
                }}
              >
                {date}
              </Typography>
            ))}
          </Stack>
        </Stack>
        <Stack>
          <Typography variant="h5">{date}</Typography>

          {trackList.map(({ title, id, mp3 }) => (
            <Typography
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setIsPlaying(!isPlaying);
                setAudioSource(mp3);
              }}
              key={id}
            >
              {title}
            </Typography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
