import express from "express";
import UserController from "../controllers/UserController";
import SongController from "../controllers/SongController";

const router = express.Router();

router.get("/user/:id", UserController.getUserById);
router.post("/register", UserController.registerUser);

router.post("/songSubmittion", SongController.submitSong);

export default router;
