"use client";
import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";
import { getAllSongSubmissions } from "../services/phishin";
import { songSubmissionCard } from "../types/showTypes";

const RecentSubmissions = () => {
  const [songSubmissions, setSongSubmissions] = useState<songSubmissionCard[]>([]);

  const handleUpvote = async (id: string) => {
    const response = await fetch(`http://localhost:8000/${id}/upVote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedVoteCount = await response.json();
    setSongSubmissions((oldSubmissions) => [...oldSubmissions, updatedVoteCount]);
    // TODO: updateVoteCount doesn't need to be returned, changed later
    return updatedVoteCount;
  };

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
  }, [songSubmissions]);

  return (
    <div>
      {songSubmissions?.map((el) => {
        return (
          <SongCard
            onClick={() => handleUpvote(el._id)}
            voteCount={el.voteCount}
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
