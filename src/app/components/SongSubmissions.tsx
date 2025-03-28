"use client";
import React, { useEffect, useContext, useState, FormEvent } from "react";
import SongCard from "./SongCard";
import { SongContext } from "@/context/SongContext";
import { useSession } from "next-auth/react";
import { Stack, Typography } from "@mui/material";
import { getProfilePicture } from "@/services/userServices";
import DeletePostModal from "./DeletePostModal";
import { ModalContext } from "@/context/ModalContext";
import Skeleton from "@mui/material/Skeleton";

interface SubmissionProps {
  fetchRequest: (
    filterName?: string | undefined,
    valueName?: string | undefined
  ) => Promise<void>;
}

const SongSubmissions = ({ fetchRequest }: SubmissionProps) => {
  const session = useSession();
  const userId = session.data?.user.userId;
  const username = session.data?.user.username;
  const [refetchVote, setRefetchVote] = useState(false);
  const [comment, setComment] = useState("");
  const { songSubmissions, setError, loading, postIdToDelete, setPostIdToDelete } =
    useContext(SongContext);
  const { isDeletePostModalOpen, closeDelPostModal } = useContext(ModalContext);

  useEffect(() => {
    fetchRequest();
  }, [refetchVote]);

  const handleUpvote = async (id: string) => {
    try {
      const res = await fetch(`${process.env.PHAVORITES_EXPRESS}/${id}/upVote`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      });
      // Weird stuff - if I fetch from the api on the line below and set the state to the return value then call the api again via useEffect with refetchVote state change then the upvote/downvote weirdness goes away. My take is setting the songSubmissions state twice here just assures the state will reflect correctly in the UI. There is definitely a better way to do this but going to leave for now.
      // const submissions = await fetchRequest();
      // setSongSubmissions(submissions);

      if (res.status === 400) {
        const error = await res.json();
        alert(error.message);
      }
      setRefetchVote((prevState) => !prevState);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>, postId: string) => {
    event.preventDefault();
    if (comment == "") {
      setError("Please type a comment");
    } else {
      if (session.status == "authenticated") {
        await fetch(`${process.env.PHAVORITES_EXPRESS}/addComment/${postId}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            comment,
            username,
            userId,
          }),
        });
        setRefetchVote((prevState) => !prevState);
        // Setting the comment to an empty string after submit doesn't work?
        setComment("");
        setError("");
      } else {
        setError("Please login to submit a comment");
      }
    }
  };

  const getPostedUserProfilePicture = async (userId: string): Promise<string> =>
    await getProfilePicture(userId);

  return (
    <div>
      <DeletePostModal
        isOpen={isDeletePostModalOpen}
        onClose={() => {
          closeDelPostModal();
          setPostIdToDelete("");
        }}
        postId={postIdToDelete}
      />
      {loading ? (
        <Stack gap={3} mt={2}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index} // keys shouldn't be set to index but acception here since the key here doesn't matter, just doing it to not see lint issues
              sx={{ borderRadius: 4 }}
              variant="rounded"
              width={478}
              height={220}
            />
          ))}
        </Stack>
      ) : songSubmissions.length == 0 ? (
        <Typography mt={5}>No Submissions yet</Typography>
      ) : (
        songSubmissions?.map((el) => {
          return (
            <SongCard
              comment={comment}
              commentTyped={setComment}
              addComment={(event) => submitComment(event, el._id)}
              upVote={() => handleUpvote(el._id)}
              getPostedUserProfilePicture={() =>
                getPostedUserProfilePicture(el.userWhoPosted.userId)
              }
              key={el._id}
              songCardData={{
                _id: el._id,
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
            />
          );
        })
      )}
    </div>
  );
};

export default SongSubmissions;
