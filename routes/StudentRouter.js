import express from "express";
import { FetchAllStudents } from "../controllers/StudentController.js";


const router = express.Router();

router.get("/students/fetch-all-students", FetchAllStudents);



export default router;