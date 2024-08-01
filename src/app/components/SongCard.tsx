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
import React, { useState } from "react";

// TODO: extend this with songSubmissionCard
interface songSubmissionCardProps {
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
  voteCount: string;
  addComment: () => Promise<void>;
  commentTyped: React.Dispatch<React.SetStateAction<string>>;
  comments: { comment: string; username: string; _id: string }[];
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
  addComment,
  commentTyped,
  comments,
}: songSubmissionCardProps) => {
  const [openComments, setOpenComments] = useState(false);
  const toggleOpenComments = () => {
    setOpenComments(!openComments);
  };
  return (
    <>
      <Stack
        width={"30rem"}
        position={"absolute"}
        zIndex={999}
        borderRadius={openComments ? "16px 16px 0px 0px" : 4}
        sx={{ backgroundColor: "white" }}
        direction={"row"}
        p={1}
        height={"204px"}
      >
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
            <Button onClick={() => toggleOpenComments()}>View Comments</Button>
          </Stack>
        </Stack>
      </Stack>
      <Box
        borderRadius={openComments ? "0px 0px 16px 16px" : 4}
        flexDirection={"column"}
        sx={{
          transition: "all 0.5s ease",
          marginTop: openComments ? "200px" : 1,
          height: openComments ? "250px" : "195px",
        }}
        width={"30rem"}
        p={1}
      >
        {comments.map(({ username, comment, _id }) => {
          return (
            <Stack direction={"row"} gap={1} key={_id} p={1}>
              <Typography color={"primary"}>{username}:</Typography>
              <Typography color={"primary"}>{comment}</Typography>
            </Stack>
          );
        })}
        <form onSubmit={addComment}>
          <TextField
            sx={{ display: "flex", alignItems: "center" }}
            color="primary"
            onChange={(e) => commentTyped(e.target.value)}
            // fullWidth
            label="comment"
          ></TextField>
          <Button
            sx={{ borderRadius: 2, color: "white" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default SongCard;
