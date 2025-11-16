import express from "express";
import { createUser, createStudentUser } from "../controllers/CreateUserController.js";
import tokenMiddleware from "../middleware/TokenMiddleware.js";

const router = express.Router();
router.post("/create-user", tokenMiddleware, createUser);
router.post("/create-student-user", createStudentUser);



export default router;


