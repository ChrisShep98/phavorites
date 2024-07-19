import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";
import { songSubmissionCard } from "../types/showTypes";

interface songSubmissionCardProps {
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
  voteCount: string;
  onClick: () => Promise<void>;
}

const SongCard = ({
  songName,
  venueLocation,
  venueName,
  date,
  description,
  voteCount,
  onClick,
}: songSubmissionCardProps) => {
  return (
    <Box
      width={"35rem"}
      mt={1}
      p={1}
      borderRadius={3}
      boxShadow={
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
      }
    >
      <Stack direction={"row"}>
        <Stack>
          <IconButton disableRipple onClick={onClick}>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography
            my={"auto"}
            mx={3}
            border={"3px solid #4162ff"}
            p={2}
            borderRadius={"50%"}
            fontWeight={600}
            padding={"10px 15px"}
          >
            {voteCount}
          </Typography>
        </Stack>
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
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SongCard;
