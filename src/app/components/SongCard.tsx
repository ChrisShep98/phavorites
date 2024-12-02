import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { SongContext } from "@/context/SongContext";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/context/ModalContext";

// TODO: combine / extend this type with songSubmissionCard
interface SongCardData {
  songName: string;
  venueLocation: string;
  venueName: string;
  date: string;
  description: string;
  voteCount: string;
  comments: { comment: string; username: string; userId: string; _id: string }[];
  slug: string;
  userWhoPosted: {
    username: string;
    userId: string;
  };
}

interface SongSubmissionCardProps {
  songCardData: SongCardData;
  addComment: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  commentTyped: React.Dispatch<React.SetStateAction<string>>;
  upVote: () => Promise<void>;
  comment: string;
  getPostedUserProfilePicture: (userID: string) => Promise<string>;
}

const SongCard = ({
  songCardData,
  upVote,
  addComment,
  commentTyped,
  comment,
  getPostedUserProfilePicture,
}: SongSubmissionCardProps) => {
  const { error } = useContext(SongContext);

  const router = useRouter();
  const theme = useTheme();

  const [openComments, setOpenComments] = useState(false);
  const { isProPicModalOpen } = useContext(ModalContext);
  const [profilePicture, setProfilePicture] = useState("");

  const toggleOpenComments = () => {
    setOpenComments(!openComments);
  };

  useEffect(() => {
    const postedUserProfilePicFetch = async (userId: string) => {
      const fetchedProfilePicture = await getPostedUserProfilePicture(userId);
      setProfilePicture(fetchedProfilePicture);
    };
    postedUserProfilePicFetch(songCardData.userWhoPosted.userId);
  }, [isProPicModalOpen]);

  return (
    <>
      <Stack
        sx={{
          [theme.breakpoints.down(482)]: {
            width: "24rem",
          },
        }}
        overflow={"hidden"}
        width={"30rem"}
        borderRadius={4}
        p={1}
        mb={3}
        mt={2}
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        }
      >
        <Stack direction={"row"}>
          <Stack>
            <IconButton disableRipple onClick={upVote}>
              <ArrowUpwardIcon />
            </IconButton>
            <Box
              my={"auto"}
              mx={3}
              border={"3px solid #4162ff"}
              width={"32px"}
              height={"32px"}
              borderRadius={"50%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              p={2.5}
            >
              <Typography fontWeight={600}>{songCardData.voteCount}</Typography>
            </Box>
          </Stack>
          <Stack gap={1} width={"-webkit-fill-available"}>
            <Typography
              sx={{ cursor: "pointer" }}
              width={"fit-content"}
              onClick={() => router.push(`/song/${songCardData.slug}`)}
              fontWeight={500}
            >
              {songCardData.songName}
            </Typography>
            <Divider sx={{ width: "275px" }} />
            <Typography>
              {songCardData.date} - {songCardData.venueLocation}, {songCardData.venueName}
            </Typography>
            {/* TODO set a new Typography variant with correct styles using rem or em */}
            <Typography fontSize={"13px"} color={"grey"}>
              Description:
            </Typography>
            <Typography>{songCardData.description}</Typography>
            <Button
              sx={{
                mt: 1,
                justifyContent: "left",
                padding: 0,
                width: "fit-content",
              }}
              onClick={() => toggleOpenComments()}
            >
              View Comments
            </Button>
            <Stack
              gap={1}
              mr={2}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Typography>Posted by: </Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  router.push(`/user/${songCardData.userWhoPosted.username}`)
                }
              >
                {songCardData.userWhoPosted.username}
              </Typography>
              <Avatar
                src={profilePicture}
                sx={{
                  width: 32,
                  height: 32,
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Box
          p={0}
          flexDirection={"column"}
          sx={{
            transition: "all 1.0s ease",
            maxHeight: openComments ? "550px" : "0px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height:
                songCardData.comments.length > 4
                  ? "20rem"
                  : songCardData.comments.length * 64,
              overflowY: "auto",
              padding: 0,
            }}
          >
            {songCardData.comments.map(({ username, userId, comment, _id }) => {
              return (
                <Stack direction={"row"} gap={1} key={_id} p={2}>
                  {/* <Avatar
                    // src={profilePicture}
                    sx={{
                      width: 32,
                      height: 32,
                    }}
                  /> */}
                  <Typography
                    color={"primary"}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => router.push(`/user/${username}`)}
                  >
                    {username}:
                  </Typography>
                  <Typography color={"primary"}>{comment}</Typography>
                </Stack>
              );
            })}
          </Box>
          <form
            onSubmit={addComment}
            style={{ display: "flex", gap: "2rem", justifyContent: "center" }}
          >
            <TextField
              color="primary"
              onChange={(e) => commentTyped(e.target.value)}
              value={comment}
              label="Comment"
            />
            <Button
              sx={{ borderRadius: 4, color: "white" }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </form>
          <Typography textAlign={"center"} p={1} color={"red"}>
            {error}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default SongCard;
