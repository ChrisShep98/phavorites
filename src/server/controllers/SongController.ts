import SongVersions from "../models/SongVersions";
import { Request, Response } from "express";

class SongController {
  submitSong = async (req: Request, res: Response) => {
    try {
      const { songName, date, venueName, venueLocation, userWhoPosted, description } =
        await req.body;

      await SongVersions.create({
        songName,
        date,
        description,
        userWhoPosted,
        venueName,
        venueLocation,
      });
      // TODO: logic to check if the song version has already been posted

      return res.status(200).json({ message: "Song version created!" });
    } catch (error) {
      return res.sendStatus(400);
    }
  };
}

export default new SongController();
