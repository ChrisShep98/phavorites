import { Box, Button, Modal, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

// TODO: export this from a different file since being used multiple places
interface ModalType {
  isOpen: boolean;
  onClose: () => void;
}

// TODO: duplicate style move to a global file
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
};

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
            Upload a cool profile pic!
          </Typography>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
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
