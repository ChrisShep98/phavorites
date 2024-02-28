"use client";
import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { years } from "../constants/shows";
import { shows } from "../types/showTypes";
import { tracks } from "../types/showTypes";
import { getTrackList } from "../services/phishin";
import { getShows } from "../services/phishin";

const UserInfo = () => {
  const { data: session } = useSession();

  const [year, setYear] = useState("");
  const [allYearShows, setAllYearShows] = useState<shows[]>([]);

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

  return (
    <Stack>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Typography sx={{ flexGrow: 1 }}>View Shows</Typography>
          <Button onClick={() => signOut()} color="inherit">
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <FormControl variant="filled" sx={{ m: 10, minWidth: 120 }}>
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
      </div>
      <Stack m={7} flexDirection={"row"} gap={5}>
        <Stack>
          <Typography variant="h5">Year</Typography>
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

          {trackList.map(({ title }) => (
            <Stack key={title}>{title}</Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
