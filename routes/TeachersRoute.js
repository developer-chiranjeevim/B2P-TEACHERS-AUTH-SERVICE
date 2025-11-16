import express from "express";
import { TeachersController } from "../controllers/TeachersController.js";


const router = express.Router();

router.get("/teachers/fetch-all-teachers", TeachersController);



export default router;