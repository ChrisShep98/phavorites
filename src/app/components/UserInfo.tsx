"use client";
import { Stack } from "@mui/material";
import React from "react";
import Nav from "./Nav";
import RecentSubmissions from "./RecentSubmissions";

const UserInfo = () => {
  return (
    <div>
      <Nav />
      <RecentSubmissions />
    </div>
  );
};

export default UserInfo;
