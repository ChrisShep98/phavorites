import SongVersions from "../models/SongVersions";
import { Request, Response } from "express";

class SongController {
  submitSong = async (req: Request, res: Response) => {
    try {
      const { songName, date, venueName, venueLocation, userWhoPosted, description } =
        await req.body;

      const alreadyExists = await SongVersions.findOne({ date: date });

      if (alreadyExists) {
        return res.status(400).json({
          message: `This version was already posted by - ${alreadyExists.userWhoPosted}`,
        });
      }

      await SongVersions.create({
        songName,
        date,
        description,
        userWhoPosted,
        venueName,
        venueLocation,
      });

      return res.status(200).json({ message: "Song version created!" });
    } catch (error) {
      return res.sendStatus(400);
    }
  };
}

export default new SongController();
