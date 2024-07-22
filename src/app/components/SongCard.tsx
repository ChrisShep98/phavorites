import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React from "react";

interface songSubmissionCardProps {
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
  voteCount: string;
  addComment: () => Promise<void>;
  commentTyped: React.Dispatch<React.SetStateAction<string>>;
  // comments: { comment: string; user: string }[];
  upVote: () => Promise<void>;
}

const SongCard = ({
  songName,
  venueLocation,
  venueName,
  date,
  description,
  voteCount,
  upVote,
}: // addComment,
// commentTyped,
songSubmissionCardProps) => {
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
          <IconButton disableRipple onClick={upVote}>
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
            {/* <form onSubmit={addComment}>
              <TextField
                onChange={(e) => commentTyped(e.target.value)}
                fullWidth
                label="comment"
              ></TextField>
              <Button
                sx={{ borderRadius: 2 }}
                color={"primary"}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </form> */}
            <Typography>Make a comment</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SongCard;
