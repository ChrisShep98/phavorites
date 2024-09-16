"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getUserByUsername } from "@/services/userServices";
import { usePathname } from "next/navigation";

const ProfileDetails = () => {
  interface User {
    createdAt: string;
    username: string;
  }

  const [userDetails, setUserDetails] = useState<User>();
  const usernameParam = usePathname().slice(9);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserByUsername(usernameParam);
      setUserDetails(profile);
    };
    fetchUserProfile();
  }, []);

  const date = new Date(String(userDetails?.createdAt));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Box p={10}>
      <Typography variant="h4">{userDetails?.username} </Typography>
      <Typography variant="h5">Account created on: {formattedDate}</Typography>
    </Box>
  );
};

export default ProfileDetails;
