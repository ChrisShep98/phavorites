import React, { FormEvent, useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllPreformancesOfSongs } from "@/services/phishin";
import { songs } from "@/constants/songs";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { SongContext } from "@/context/SongContext";
import { ModalContext } from "@/context/ModalContext";
import { getAllSongSubmissions } from "@/services/phishin";

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

interface ModalType {
  isOpen: boolean;
  onClose: () => void;
}

interface DateSelectedType {
  date: string;
  venueName: string;
  venueLocation: string;
}

export default function SubmitPostModal({ isOpen, onClose }: ModalType) {
  //TODO: form data (change into an object later on probably)

  const { closeModal } = useContext(ModalContext);

  const { setSongSubmissions } = useContext(SongContext);
  const [songSelected, setSongSelected] = useState("");
  const [dateSelected, setDateSelected] = useState("");
  const [myVenueInfo, setMyVenueInfo] = useState<DateSelectedType | undefined>({
    date: "",
    venueName: "",
    venueLocation: "",
  });
  const [description, setDescription] = useState("");
  //TODO: add error to UI providing link and name of user who posted or no description
  const [error, setError] = useState("");
  const session = useSession();

  const [allDatesOfSong, setAllDatesOfSong] = useState<string[]>([]);

  //TODO: I'm using this kinda of function frequently thought out the app, probably make a global func I can use instead of this wet code
  const fetchSubmissions = async () => {
    const allSubmissions = await getAllSongSubmissions();
    setSongSubmissions(allSubmissions);
  };

  const slug =
    songSelected == null
      ? setSongSelected("")
      : songSelected.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description) {
      setError("Please provide a description");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/songSubmittion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          songName: songSelected,
          description,
          date: dateSelected,
          userWhoPosted: session.data?.user.username,
          venueLocation: myVenueInfo?.venueLocation,
          venueName: myVenueInfo?.venueName,
          slug,
        }),
      });
      if (res.status === 400) {
        res.json().then((data) => {
          setError(data.message);
        });
      } else {
        fetchSubmissions();
        //TODO: some kind of success message?
        closeModal();
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (songSelected) {
      console.log("useEffect is run");
      const fetchData = async () => {
        try {
          const myData = await getAllPreformancesOfSongs(slug!);
          // remove duplicates with new Set()
          const dates = [...new Set(myData.map((el) => el.date))];
          setAllDatesOfSong(dates);
          if (dateSelected !== "") {
            const myDateData = myData.find((obj) => obj.date === dateSelected);
            setMyVenueInfo(myDateData);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [songSelected, dateSelected]);

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
            Submit a song
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={songs}
              onChange={(event, newValue) => {
                setSongSelected(newValue!); // Update state with the selected value
              }}
              sx={{ backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField sx={{ color: "white" }} {...params} label="Songs" />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={songSelected ? allDatesOfSong : []}
              onChange={(event, newValue) => {
                setDateSelected(newValue!);
              }}
              sx={{ backgroundColor: "white" }}
              renderInput={(params) => (
                <TextField sx={{ color: "white" }} {...params} label="Dates" />
              )}
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              label="Description"
            ></TextField>
            <Button
              sx={{ borderRadius: 2 }}
              color={"primary"}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </form>
          {error ? <Typography mt={2}>{error}</Typography> : null}
        </Box>
      </Modal>
    </div>
  );
}
