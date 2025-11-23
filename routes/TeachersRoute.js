import express from "express";
import { TeachersController, sendTeacherApproval } from "../controllers/TeachersController.js";


const router = express.Router();

router.get("/teachers/fetch-all-teachers", TeachersController);
router.post("/teachers/send-teacher-approval", sendTeacherApproval);



export default router;