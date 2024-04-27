import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { signOut } from "next-auth/react";
import React from "react";

const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Typography sx={{ flexGrow: 1 }}>View Shows</Typography>
        <Typography sx={{ flexGrow: 1 }}>Public Playlists</Typography>
        <Typography sx={{ flexGrow: 1 }}>Your Playlists</Typography>

        <Button onClick={() => signOut()} color="inherit">
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
