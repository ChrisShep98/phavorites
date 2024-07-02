"use client";
import React, { useEffect, useState } from "react";
import SongInfo from "./SongInfo";
import { getAllSongSubmissions } from "../services/phishin";
import { songSubmissionCardProps } from "../types/showTypes";

const RecentSubmissions = () => {
  const [songSubmissions, setSongSubmissions] = useState<songSubmissionCardProps[]>();

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

  console.log(songSubmissions);
  return (
    <div>
      {songSubmissions?.map((el) => {
        // TODO: Add a key
        return (
          <SongInfo
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

{
  /* <div style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}> */
}

export default RecentSubmissions;
