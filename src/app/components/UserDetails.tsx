"use client";
import React, { useEffect, useState, useContext } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { getUserByUsername } from "@/services/userServices";
import SongSubmissions from "./SongSubmissions";
import { SongContext } from "@/context/SongContext";
import { ModalContext } from "@/context/ModalContext";
import { useSession } from "next-auth/react";
import UploadProfilePicModal from "./UploadProfilePicModal";

const UserDetails = () => {
  interface User {
    createdAt: string;
    username: string;
    _id: string;
  }

  const [userDetails, setUserDetails] = useState<User>();
  const { paramValue, fetchSongSubmissions } = useContext(SongContext);
  const { isProPicModalOpen, closeProPicModal, openProPicModal } =
    useContext(ModalContext);
  const session = useSession();
  const loggedInUserId = session.data?.user.userId;

  // TODO: Don't love that there are two fetchs being called in the component. Can simplify into just one fetch by updating the users schema and adding and array[] of their posts so you only need to fetch the user User and then loop through that array in the UI, but this is fine for now.
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByUsername(paramValue!);
      setUserDetails(user);
    };
    fetchUser();
  }, []);

  const date = new Date(String(userDetails?.createdAt));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Stack direction={"row"} p={10} justifyContent={"space-around"}>
      <UploadProfilePicModal isOpen={isProPicModalOpen} onClose={closeProPicModal} />
      <Stack>
        <Typography textTransform={"none"} fontSize={"1rem"} variant="overline">
          User: {userDetails?.username}{" "}
        </Typography>
        <Typography textTransform={"none"} fontSize={"1rem"} variant="overline">
          Account created on: {formattedDate}
        </Typography>
        {loggedInUserId == userDetails?._id ? (
          <Button
            variant="outlined"
            size="small"
            sx={{ cursor: "pointer", fontWeight: "400", borderRadius: 4 }}
            onClick={openProPicModal}
          >
            Change Profile Picture
          </Button>
        ) : null}
      </Stack>
      <Stack>
        <Typography variant="h5">{userDetails?.username} posts:</Typography>
        <SongSubmissions
          fetchRequest={() => fetchSongSubmissions("userWhoPosted.username", paramValue)}
        />
      </Stack>
    </Stack>
  );
};

export default UserDetails;
