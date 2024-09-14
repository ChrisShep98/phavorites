"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";

const ProfileDetails = () => {
  // im pulling some pretty basic user date being stored in the next session object but in the near future I will want to pull more extensive user data from an api endpoint so users can look up other users
  const session = useSession();
  // BUG FOUND: TODO - When a user is on their profile page and it's grabbing the data from session and they logoout it will throw and error from due to there being no session data in line 10
  const { username, createdAt } = session.data!.user;

  const date = new Date(String(createdAt));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Box p={10}>
      <Typography variant="h4">Hello {username} </Typography>
      <Typography variant="h5">Account created on: {formattedDate}</Typography>
    </Box>
  );
};

export default ProfileDetails;
