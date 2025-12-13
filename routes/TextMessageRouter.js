import express from "express";
import { sendTextMessage } from "../controllers/TextMessageController.js";
import dotenv from "dotenv";


dotenv.config();


const router = express.Router();


router.post("/text/send-message", sendTextMessage);


export default router;