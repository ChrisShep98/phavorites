"use client";
import {
  Box,
  Avatar,
  Button,
  AppBar,
  Link as MuiLink,
  Stack,
  Typography,
  Autocomplete,
  TextField,
  Popover,
  IconButton,
  MenuItem,
  Menu,
  ListItemText,
} from "@mui/material";
import { signOut } from "next-auth/react";
import React, { ReactNode, useContext, useState } from "react";
import { songs } from "@/constants/songs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitPostModal from "./SubmitPostModal";
import phishLogo from "images/phishlogo.webp";
import Image from "next/image";
import "animate.css";
import dog from "images/dog.jpg";
import { ModalContext } from "@/context/ModalContext";

interface NavProps {
  children: ReactNode;
}

const Nav = ({ children }: NavProps) => {
  //TODO: move all the fetching and statemanagement going on in SubmitPostModal to this parent container?
  const session = useSession();
  const router = useRouter();

  const { isModalOpen, closeModal, openModal } = useContext(ModalContext);

  const [songAnchorEl, setSongAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleSongClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSongAnchorEl(event.currentTarget);
  };
  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleSongClose = () => {
    setSongAnchorEl(null);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const randomSong = () => {
    const randomIdx = Math.floor(Math.random() * 950 + 1);
    router.push(`/song/${songs[randomIdx].slug}`);
  };

  const openSongSearchMenu = Boolean(songAnchorEl);
  const openProfileMenu = Boolean(profileAnchorEl);

  return (
    <AppBar
      className={"animate__animated animate__fadeIn"}
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none", color: "primary.main" }}
    >
      <SubmitPostModal isOpen={isModalOpen} onClose={closeModal} />

      <Box
        component="ul"
        display="flex"
        justifyContent={"space-evenly"}
        p={0}
        overflow="hidden"
        sx={{ listStyleType: "none" }}
      >
        <Box display="flex" borderRadius={"35px"} px={2}>
          <MuiLink
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              className="animate__animated animate__bounceInDown"
              src={phishLogo}
              height={100}
              width={100}
              alt="phishLogo"
              // style={{
              //   backgroundColor: "#fff",
              // }}
            />
          </MuiLink>
        </Box>
        <Stack flexDirection={"row"} alignItems={"center"} gap={4}>
          <Button sx={{ textTransform: "none" }} onClick={handleSongClick}>
            <Typography color={"primary.main"} letterSpacing={"0.10rem"}>
              Search
            </Typography>
          </Button>
          <Popover
            open={openSongSearchMenu}
            anchorEl={songAnchorEl}
            onClose={handleSongClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={songs}
              onChange={(event, newValue) => {
                router.push(`/song/${newValue?.slug}`);
              }}
              getOptionLabel={(option) => option.song}
              sx={{ width: 300, height: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField sx={{ color: "white" }} {...params} label="Songs" />
              )}
            />
          </Popover>
          <Button onClick={openModal} sx={{ textTransform: "none" }}>
            <Typography color={"primary.main"} letterSpacing={"0.10rem"}>
              Submit Song
            </Typography>
          </Button>
          <Button onClick={randomSong} sx={{ textTransform: "none" }}>
            <Typography color={"primary.main"} letterSpacing={"0.10rem"}>
              Random Song
            </Typography>
          </Button>
        </Stack>
        <Stack justifyContent={"center"}>
          {session.status === "authenticated" && (
            <>
              <IconButton
                onClick={handleProfileClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openProfileMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? "true" : undefined}
              >
                <Avatar
                  className="animate__animated animate__bounceInDown"
                  sx={{
                    width: 62,
                    height: 62,
                  }}
                >
                  <Image
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={dog}
                    alt="profile picture"
                  ></Image>
                  {/* TODO: set loading state for this later */}
                  {session.data?.user.username ? session.data?.user.username[0] : ""}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={profileAnchorEl}
                id="account-menu"
                open={openProfileMenu}
                onClose={handleProfileClose}
                onClick={handleProfileClose}
                sx={{
                  "& .MuiAvatar-root": {
                    mr: 1,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <ListItemText
                    onClick={() => router.push(`/profile/${session.data.user.username}`)}
                  >
                    Profile
                  </ListItemText>
                </MenuItem>

                <MenuItem>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText onClick={() => signOut()}>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          )}
          {session.status === "unauthenticated" && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => router.push("/register")}
              sx={{
                borderRadius: "35px",
                border: "1px solid lightgrey",
                textTransform: "none",
                color: "#F1F1F1",
                margin: 2,
                "&hover": {
                  backgroundColor: "#F1F1F1",
                },
              }}
            >
              <Typography color="#6273b3">Get Started</Typography>
            </Button>
          )}
        </Stack>
      </Box>
      {children}
    </AppBar>
    // <Box
    //   display={"flex"}
    //   flexDirection="column"
    //   width={"100vw"}
    //   height={"100vh"}
    //   justifyContent={"center"}
    // >
    //   <SubmitPostModal isOpen={isModalOpen} onClose={closeModal} />
    //   <Box
    //     position={"absolute"}
    //     zIndex={999}
    //     borderRadius={"25px"}
    //     sx={{ backgroundColor: "primary.main" }}
    //     width={"250px"}
    //     height={"80%"}
    //     ml={1}
    //   >
    //     <List sx={{ width: "100%", color: "#fff" }}>
    //       <ListItem>
    //         <ListItemAvatar>
    //           <Avatar>{/* <ImageIcon /> */}</Avatar>
    //         </ListItemAvatar>
    //         <ListItemText
    //           primary={
    //             session.status == "authenticated"
    //               ? `${session.data.user.username}`
    //               : "Anonymous"
    //           }
    //           secondary={
    //             session.status == "authenticated"
    //               ? `Joined ${formattedDate}`
    //               : "Date joined?"
    //           }
    //           sx={{
    //             // kinda gross should fix this
    //             ".css-83ijpv-MuiTypography-root": {
    //               color: "#7c7c7c",
    //             },
    //           }}
    //         />
    //       </ListItem>
    //       <Divider variant="middle" sx={{ borderColor: "#fff" }} />
    //       <ListItem>
    //         <ListItemButton>
    //           {session.status == "unauthenticated" ? (
    //             <ListItemText primary="Sign In" onClick={() => router.push("/login")} />
    //           ) : (
    //             <ListItemText
    //               primary="Sign Out"
    //               onClick={() => signOut({ callbackUrl: "/login" })}
    //             />
    //           )}
    //         </ListItemButton>
    //       </ListItem>
    //       <ListItem>
    //         {/* this will only direct user to dynamic route to show submitions of the song seleted */}
    //         <ListItemButton>
    //           <ListItemText onClick={() => toggleSongsList()} primary="Songs" />
    //         </ListItemButton>
    //       </ListItem>
    //       <ListItem>
    //         <ListItemButton>
    //           <ListItemText primary="Search Shows" />
    //         </ListItemButton>
    //       </ListItem>
    //       <ListItem>
    //         <ListItemButton>
    //           <ListItemText primary="Submit a song" onClick={openModal} />
    //         </ListItemButton>
    //       </ListItem>
    //       <ListItem>
    //         <ListItemButton>
    //           <ListItemText primary="Random Song" />
    //         </ListItemButton>
    //       </ListItem>
    //     </List>
    //   </Box>

    //   <Box
    //     borderRadius={"25px"}
    //     sx={{
    //       backgroundColor: "#1c1c1c",
    //       transition: "all 0.5s ease",
    //       marginLeft: openSongSearch ? "250px" : 1,
    //     }}
    //     width={"250px"}
    //     height={"80%"}
    //   >
    //     <List sx={{ width: "100%", color: "#fff" }}>
    //       <ListItem>Phish Icon</ListItem>
    //       <Divider variant="middle" sx={{ borderColor: "#fff" }} />
    //       <ListItem color="#fff">
    //         <Autocomplete
    //           disablePortal
    //           id="combo-box-demo"
    //           options={songs}
    //           sx={{ width: 300, backgroundColor: "white" }}
    //           renderInput={(params) => (
    //             <TextField sx={{ color: "white" }} {...params} label="Songs" />
    //           )}
    //         />
    //       </ListItem>
    //     </List>
    //   </Box>
    // </Box>
  );
};

export default Nav;
