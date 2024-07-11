"use client";
import React, { useEffect, useState } from "react";
import SongInfo from "./SongInfo";
import { getAllSongSubmissions } from "../services/phishin";
import { songSubmissionCard } from "../types/showTypes";
import { Box } from "@mui/material";

const RecentSubmissions = () => {
  const [songSubmissions, setSongSubmissions] = useState<songSubmissionCard[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSubmissions = await getAllSongSubmissions();
        setSongSubmissions(allSubmissions);
      } catch (error) {
        // TODO: create state to set error
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {songSubmissions?.map((el) => {
        return (
          <SongInfo
            key={el._id}
            date={el.date}
            songName={el.songName}
            venueLocation={el.venueLocation}
            venueName={el.venueName}
            description={el.description}
          />
        );
      })}
    </div>
  );
};

export default RecentSubmissions;
