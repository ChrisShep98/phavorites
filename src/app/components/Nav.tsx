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
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { songs } from "@/constants/songs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitPostModal from "./SubmitPostModal";
import phishLogo from "images/phishlogo.webp";
import Image from "next/image";
import "animate.css";
import { ModalContext } from "@/context/ModalContext";
import { getProfilePicture } from "@/services/userServices";
import CircularProgress from "@mui/material/CircularProgress";

interface NavProps {
  children: ReactNode;
}

interface User {
  createdAt: string;
  username: string;
  _id: string;
  profilePicture: string;
}

const Nav = ({ children }: NavProps) => {
  //TODO: move all the fetching and statemanagement going on in SubmitPostModal to this parent container?
  const session = useSession();
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState("");
  const { isProPicModalOpen } = useContext(ModalContext);
  const [loading, setLoading] = useState(true);

  // TODO: Don't love the isProPicModalOpen dependency here bcuz of necessary calls but will leave for now
  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (session.data !== null && session.data.user.userId !== undefined) {
        const profilePicture = await getProfilePicture(session.data.user.userId);
        setProfilePicture(profilePicture);
        setLoading(false);
      }
    };
    fetchProfilePicture();
  }, [session.data, isProPicModalOpen]);

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
            />
          </MuiLink>
        </Box>
        <Stack flexDirection={"row"} alignItems={"center"} gap={4}>
          <Button sx={{ textTransform: "none" }} onClick={handleSongClick}>
            <Typography variant="overline">Search</Typography>
          </Button>
          <Popover
            sx={{ "& .MuiPaper-root": { scrollbarWidth: "none" } }}
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
            <Typography variant="overline">Submit Song</Typography>
          </Button>
          <Button onClick={randomSong} sx={{ textTransform: "none" }}>
            <Typography variant="overline">Random Song</Typography>
          </Button>
        </Stack>
        {/* width of 132 px to match phish icon and even out the nav bar */}
        <Stack justifyContent={"center"} width={"132px"}>
          {session.status === "authenticated" && (
            <>
              <IconButton
                disableRipple={true}
                onClick={handleProfileClick}
                size="small"
                aria-controls={openProfileMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? "true" : undefined}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : (
                  <Avatar
                    className="animate__animated animate__bounceInDown"
                    src={profilePicture}
                    sx={{
                      width: 62,
                      height: 62,
                    }}
                  />
                )}
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
                transformOrigin={{ horizontal: "center", vertical: "top" }}
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              >
                <MenuItem onClick={handleProfileClose}>
                  <ListItemText
                    onClick={() => router.push(`/user/${session.data.user.username}`)}
                  >
                    Profile
                  </ListItemText>
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
              <Typography color="#0a0a0a">Get Started</Typography>
            </Button>
          )}
        </Stack>
      </Box>
      {children}
    </AppBar>
  );
};

export default Nav;
