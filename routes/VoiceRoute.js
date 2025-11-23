import express from "express";
import { VoiceCallController } from "../controllers/VoiceCallController.js";

const router = express.Router();

router.post("/students/voice-class", VoiceCallController);


export default router;