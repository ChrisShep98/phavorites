"use client";
import {
  Box,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
  Autocomplete,
  TextField,
} from "@mui/material";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { songs } from "../constants/songs";
import Image from "next/image";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const toggleSongsList = () => {
    setOpen(!open);
  };
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
    >
      <Box
        position={"absolute"}
        zIndex={999}
        borderRadius={"25px"}
        sx={{ backgroundColor: "#0a0a0a" }}
        width={"250px"}
        height={"700px"}
        ml={1}
      >
        <List sx={{ width: "100%", color: "#fff" }}>
          {/* check if session exists and replace with login button if not */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>{/* <ImageIcon /> */}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Anonymous"
              secondary="Date joined?"
              sx={{
                // kinda gross should fix this
                ".css-83ijpv-MuiTypography-root": {
                  color: "#7c7c7c",
                },
              }}
            />
          </ListItem>
          <Divider variant="middle" sx={{ borderColor: "#fff" }} />
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText onClick={() => toggleSongsList()} primary="Songs" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Search Shows" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Random Song" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box
        borderRadius={"25px"}
        sx={{
          backgroundColor: "#1c1c1c",
          transition: "all 0.5s ease",
          marginLeft: open ? "250px" : 1,
        }}
        width={"250px"}
        height={"700px"}
      >
        <List sx={{ width: "100%", color: "#fff" }}>
          <ListItem>Phish Icon</ListItem>
          <Divider variant="middle" sx={{ borderColor: "#fff" }} />
          <ListItem color="#fff">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={songs}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField sx={{ color: "white" }} {...params} label="Songs" />
              )}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Nav;
