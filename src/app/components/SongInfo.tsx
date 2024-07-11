import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface songSubmissionCardProps {
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
}

const SongInfo = ({
  songName,
  venueLocation,
  venueName,
  date,
  description,
}: songSubmissionCardProps) => {
  return (
    <Box width={"35rem"} mt={1} border={"2px solid black"} p={1} borderRadius={3}>
      <Stack direction={"row"}>
        <Box my={"auto"} mx={3} border={"1px solid blue"} p={2} borderRadius={"50%"}>
          352
        </Box>
        <Stack gap={1}>
          <Typography>{songName}</Typography>
          <Divider />
          <Typography>
            {date} - {venueLocation}, {venueName}
            Aug. 27, 1972 - Old Renaissance Faire Grounds Veneta, OR
          </Typography>
          <Typography>{description}</Typography>
          <Stack direction={"row"} gap={1}>
            <Typography>69 Comments</Typography>
            <Typography>Make a comment</Typography>
            <Typography>Upvote</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SongInfo;
