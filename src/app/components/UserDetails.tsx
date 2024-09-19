"use client";
import React, { useEffect, useState, useContext } from "react";
import { Stack, Typography } from "@mui/material";
import { getUserByUsername } from "@/services/userServices";
import { usePathname } from "next/navigation";
import { getSubmissions } from "@/services/phishin";
import SongSubmissions from "./SongSubmissions";
import { SongContext } from "@/context/SongContext";

const UserDetails = () => {
  interface User {
    createdAt: string;
    username: string;
  }

  const [userDetails, setUserDetails] = useState<User>();
  const param = usePathname().split("/").pop();
  const { setSongSubmissions } = useContext(SongContext);

  // TODO: Don't love that there are two fetchs being called in the component. Can simplify into just one fetch by updating the users schema and adding and array[] of their posts so you only need to fetch the user User and then loop through that array in the UI, but this is fine for now.
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByUsername(param!);
      setUserDetails(user);
    };
    fetchUser();
  }, []);

  const fetchUserSubmissions = async () => {
    const userSubmissions = await getSubmissions("userWhoPosted", param);
    setSongSubmissions(userSubmissions);
  };

  const date = new Date(String(userDetails?.createdAt));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Stack direction={"row"} p={10} justifyContent={"space-around"}>
      <Stack>
        <Typography variant="h6">User: {userDetails?.username} </Typography>
        <Typography variant="h6">Account created on: {formattedDate}</Typography>
      </Stack>
      <Stack>
        <Typography variant="h5">{userDetails?.username} posts:</Typography>
        <SongSubmissions fetchRequest={fetchUserSubmissions}></SongSubmissions>
      </Stack>
    </Stack>
  );
};

export default UserDetails;
