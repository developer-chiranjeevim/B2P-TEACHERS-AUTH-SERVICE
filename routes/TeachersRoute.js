import express from "express";
import { TeachersController, sendTeacherApproval, deleteTeacher } from "../controllers/TeachersController.js";


const router = express.Router();

router.get("/teachers/fetch-all-teachers", TeachersController);
router.post("/teachers/send-teacher-approval", sendTeacherApproval);
router.delete("/teachers/delete-teacher", deleteTeacher);



export default router;