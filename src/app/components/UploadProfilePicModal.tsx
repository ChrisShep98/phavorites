import { Box, Button, Modal, Typography } from "@mui/material";
import React, { FormEvent, useState, useContext } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { style } from "@/lib/reusableStyles/styles";
import { ModalType } from "@/types/propTypes";
import { ModalContext } from "@/context/ModalContext";

const UploadProfilePicModal = ({ isOpen, onClose }: ModalType) => {
  const [imageUpload, setImageUpload] = useState<Blob>();
  const [imagePreview, setImagePreview] = useState<string>();
  const session = useSession();
  const userId = session.data?.user.userId;

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setImageUpload(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: Play round with this more. Do I need to be doing this new instantiation of FormData()?
    const formData = new FormData();
    formData.append("profilePicture", imageUpload!);
    try {
      await fetch(`http://localhost:8000/uploadProfilePic/${userId}`, {
        method: "PUT",
        body: formData,
      });
    } catch (error) {
      console.log(error, "error");
    } finally {
      onClose();
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
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
            Upload a profile picture below!
          </Typography>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <input type="file" onChange={handleImageUpload} name="profilePicture" />
            {imageUpload ? (
              <Image src={imagePreview!} alt="your image" height={250} width={250} />
            ) : null}
            <Button
              sx={{ borderRadius: 2 }}
              color={"primary"}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </form>
          {/* {error ? <Typography mt={2}>{error}</Typography> : null} */}
        </Box>
      </Modal>
    </div>
  );
};

export default UploadProfilePicModal;
