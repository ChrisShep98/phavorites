import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

interface songSubmissionCardProps {
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
}

const SongCard = ({
  songName,
  venueLocation,
  venueName,
  date,
  description,
}: songSubmissionCardProps) => {
  return (
    <Box
      width={"35rem"}
      mt={1}
      // border={"1px solid black"}
      p={1}
      borderRadius={3}
      boxShadow={
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
      }
    >
      <Stack direction={"row"}>
        <Typography
          my={"auto"}
          mx={3}
          border={"3px solid #4162ff"}
          p={2}
          borderRadius={"50%"}
          fontWeight={600}
        >
          352
        </Typography>
        <Stack gap={1}>
          <Typography fontWeight={500}>{songName}</Typography>
          <Divider />
          <Typography>
            {date} - {venueLocation}, {venueName}
          </Typography>
          {/* TODO set a new Typography variant with correct styles using rem or em */}
          <Typography fontSize={"13px"} color={"grey"}>
            Description:
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

export default SongCard;
