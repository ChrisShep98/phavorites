import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllPreformancesOfSongs } from "@/app/services/phishin";
import { songs } from "../constants/songs";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #fff",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};

interface modalTypes {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitPostModal({ isOpen, onClose }: modalTypes) {
  const [songSelected, setSongSelected] = useState("");

  const [allDatesOfSong, setAllDatesOfSong] = useState<any[]>([""]);

  useEffect(() => {
    if (songSelected !== null) {
      const apiFriendlyString = songSelected
        .toLowerCase()
        .replaceAll(" ", "-")
        .replaceAll("/", "-");
      const fetchData = async () => {
        try {
          if (songSelected !== "") {
            const myData = await getAllPreformancesOfSongs(apiFriendlyString);
            setAllDatesOfSong(myData);
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [songSelected]);

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
          >
            Submit a song
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={songs}
            onChange={(event, newValue) => {
              setSongSelected(newValue!); // Update state with the selected value
            }}
            sx={{ width: 300, backgroundColor: "white" }}
            renderInput={(params) => (
              <TextField sx={{ color: "white" }} {...params} label="Songs" />
            )}
          />
          {songSelected ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={allDatesOfSong}
              // onChange={(event, newValue) => {
              //   setSongSelected(newValue!);
              // }}
              sx={{ width: 300, backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField sx={{ color: "white" }} {...params} label="Dates" />
              )}
            />
          ) : null}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
