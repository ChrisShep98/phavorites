"use client";
import React, { useEffect, useContext, useState } from "react";
import SongCard from "./SongCard";
import { SongContext } from "../context/SongContext";
import { useSession } from "next-auth/react";
import { getAllSongSubmissions } from "../services/phishin";

const RecentSubmissions = () => {
  const session = useSession();
  const [refetchVote, setRefetchVote] = useState(false);
  const [comment, setComment] = useState("");
  const { songSubmissions, setSongSubmissions, fetchSubmissions } =
    useContext(SongContext);

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
    // Weird stuff - if I fetch from the api on the line below and set the state to the return value then call the api again via useEffect with refetchVote state change then the upvote/downvote weirdness goes away. My take is setting the songSubmissions state twice here just assures the state will reflect correctly in the UI. There is definitely a better way to do this but going to leave for now.
    const allSubmissions = await getAllSongSubmissions();
    setSongSubmissions(allSubmissions);
    setRefetchVote((prevState) => !prevState);
  };

  const submitComment = async (postId: string) => {
    await fetch(`http://localhost:8000/addComment/${postId}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment,
        username: session.data?.user.username,
      }),
    });
  };

  return (
    <div>
      {songSubmissions?.map((el) => {
        return (
          <SongCard
            commentTyped={setComment}
            addComment={() => submitComment(el._id)}
            upVote={() => handleUpvote(el._id)}
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
