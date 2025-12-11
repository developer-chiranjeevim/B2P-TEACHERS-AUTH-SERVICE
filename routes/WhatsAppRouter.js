import express from "express";
import dotenv from "dotenv";
import { sendWhatsAppMessage } from "../controllers/WhatsAppController.js";

dotenv.config()

const router = express.Router();


router.post("/whatsapp/create-whatsapp-message", sendWhatsAppMessage);




export default router;