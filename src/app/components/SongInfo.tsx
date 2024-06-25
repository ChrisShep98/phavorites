import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface songInfoProps {
  upvotes: string;
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
  comments: string[];
}

// TO DO: delete div, add props
const SongInfo = ({}) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}>
      <Box width={"35rem"} border={"2px solid black"} p={1}>
        <Stack direction={"row"}>
          <Box my={"auto"} mx={3} border={"1px solid blue"} p={2} borderRadius={"50%"}>
            352
          </Box>
          <Stack gap={1}>
            <Typography>Bird Song</Typography>
            <Divider />
            <Typography>
              Aug. 27, 1972 - Old Renaissance Faire Grounds Veneta, OR
            </Typography>
            <Typography>Description here</Typography>
            <Stack direction={"row"} gap={1}>
              <Typography>69 Comments</Typography>
              <Typography>Make a comment</Typography>
              <Typography>Upvote</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default SongInfo;
