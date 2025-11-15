import express from "express";
import { createUser } from "../controllers/CreateUserController.js";
import tokenMiddleware from "../middleware/TokenMiddleware.js";

const router = express.Router();
router.post("/create-user", tokenMiddleware, createUser);



export default router;


