import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.get("/user/:id", UserController.getUserById);
router.post("/register", UserController.registerUser);

export default router;
