"use client";
import React, { useEffect, useContext, useState, FormEvent } from "react";
import SongCard from "./SongCard";
import { SongContext } from "@/context/SongContext";
import { useSession } from "next-auth/react";
import { Typography } from "@mui/material";

interface SubmissionProps {
  fetchRequest: () => Promise<void>;
}

const SongSubmissions = ({ fetchRequest }: SubmissionProps) => {
  const session = useSession();
  const [refetchVote, setRefetchVote] = useState(false);
  const [comment, setComment] = useState("");
  const { songSubmissions, error, setError } = useContext(SongContext);

  useEffect(() => {
    fetchRequest();
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
    // const submissions = await fetchRequest();
    // setSongSubmissions(submissions);
    setRefetchVote((prevState) => !prevState);
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>, postId: string) => {
    event.preventDefault();
    if (session.status == "authenticated") {
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
      setRefetchVote((prevState) => !prevState);
      setComment("");
    } else {
      setError("Please login to submit a comment");
    }
  };

  return (
    <div>
      {songSubmissions.length == 0 ? (
        <Typography mt={5}>No Submissions yet...maybe you could change that!</Typography>
      ) : (
        songSubmissions?.map((el) => {
          return (
            <SongCard
              comment={comment}
              commentTyped={setComment}
              addComment={(event) => submitComment(event, el._id)}
              upVote={() => handleUpvote(el._id)}
              key={el._id}
              songCardData={{
                voteCount: el.voteCount,
                date: el.date,
                songName: el.songName,
                description: el.description,
                venueName: el.venueName,
                venueLocation: el.venueLocation,
                comments: el.comments,
                slug: el.slug,
                userWhoPosted: el.userWhoPosted,
              }}
              children={
                <Typography variant="subtitle1" color={"error"}>
                  {error}
                </Typography>
              }
            />
          );
        })
      )}
    </div>
  );
};

export default SongSubmissions;
