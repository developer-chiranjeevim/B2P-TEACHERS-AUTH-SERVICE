import express from "express";
import { FetchAllStudentsNames, FetchAllStudentDetails, updateStudentActiveStatus } from "../controllers/StudentController.js";
import tokenMiddleware from "../middleware/TokenMiddleware.js";

const router = express.Router();

router.get("/students/fetch-all-students", tokenMiddleware, FetchAllStudentsNames);
router.get("/students/fetch-all-student-details", tokenMiddleware, FetchAllStudentDetails);
router.post("/student/set-student-status", tokenMiddleware, updateStudentActiveStatus)



export default router;