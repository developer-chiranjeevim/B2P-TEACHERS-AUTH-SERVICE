import express from "express";
import {LoginController, StudentLoginController} from "../controllers/LoginController.js";

const router = express.Router();

router.post("/login-user", LoginController)
router.post("/login-student-user", StudentLoginController);

export default router;