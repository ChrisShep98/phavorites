"use client";
import React, { useEffect, useContext, useState } from "react";
import SongCard from "./SongCard";
import { SongContext } from "../context/SongContext";
import { useSession } from "next-auth/react";

const RecentSubmissions = () => {
  const session = useSession();
  const [refetchVote, setRefetchVote] = useState(false);
  const { songSubmissions, fetchSubmissions } = useContext(SongContext);

  useEffect(() => {
    fetchSubmissions();
  }, [refetchVote]);

  const handleUpvote = async (id: string) => {
    await fetch(`http://localhost:8000/${id}/upVote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.data?.user.userId,
      }),
    });
    setRefetchVote((prevState) => !prevState);
  };

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
