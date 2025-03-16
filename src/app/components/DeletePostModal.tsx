import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";
import { style } from "@/lib/reusableStyles/styles";
import { DeleteModal } from "@/types/propTypes";
import { SongContext } from "@/context/SongContext";

export default function DeletePostModal({ isOpen, onClose, postId }: DeleteModal) {
  //TODO: set error and loading states
  const [error, setError] = useState("");
  const { fetchSubmissionsAllRoutes } = useContext(SongContext);

  const deletePost = async (postId: string) => {
    try {
      await fetch(`${process.env.PHAVORITES_EXPRESS}/deletePost/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      fetchSubmissionsAllRoutes();
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleModalClose = () => {
    setError("");
    onClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            textAlign={"center"}
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            Are you sure you want to delete this post?
          </Typography>
          <Stack flexDirection={"row"} justifyContent={"space-evenly"}>
            <Button
              onClick={() => {
                deletePost(postId);
              }}
              variant="contained"
            >
              Yes
            </Button>
            <Button onClick={onClose} variant="contained">
              No
            </Button>
          </Stack>
          {error && (
            <Typography color={"red"} mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
