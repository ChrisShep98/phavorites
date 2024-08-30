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
import { songs } from "@/constants/songs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitPostModal from "@/components/SubmitPostModal";

const SideNavWithSlidingComponent = () => {
  const session = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const date = new Date(String(session.data?.user.createdAt));
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const router = useRouter();
  const [openSongSearch, setOpenSongSearch] = useState(false);
  const toggleSongsList = () => {
    setOpenSongSearch(!openSongSearch);
  };

  return (
    <Box
      display={"flex"}
      flexDirection="column"
      width={"100vw"}
      height={"100vh"}
      justifyContent={"center"}
    >
      <SubmitPostModal isOpen={isModalOpen} onClose={closeModal} />
      <Box
        position={"absolute"}
        zIndex={999}
        borderRadius={"25px"}
        sx={{ backgroundColor: "primary.main" }}
        width={"250px"}
        height={"80%"}
        ml={1}
      >
        <List sx={{ width: "100%", color: "#fff" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>{/* <ImageIcon /> */}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                session.status == "authenticated"
                  ? `${session.data.user.username}`
                  : "Anonymous"
              }
              secondary={
                session.status == "authenticated"
                  ? `Joined ${formattedDate}`
                  : "Date joined?"
              }
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
              {session.status == "unauthenticated" ? (
                <ListItemText primary="Sign In" onClick={() => router.push("/login")} />
              ) : (
                <ListItemText
                  primary="Sign Out"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                />
              )}
            </ListItemButton>
          </ListItem>
          <ListItem>
            {/* this will only direct user to dynamic route to show submitions of the song seleted */}
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
              <ListItemText primary="Submit a song" onClick={openModal} />
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
          marginLeft: openSongSearch ? "250px" : 1,
        }}
        width={"250px"}
        height={"80%"}
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

export default SideNavWithSlidingComponent;
