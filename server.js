import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import LoginUserRouter from "./routes/LoginUserRouter.js";
import HomeRouter from "./routes/HomeRouter.js";
import CreateUserRouter from "./routes/CreateUserRouter.js";
import StudentRouter from "./routes/StudentRouter.js";
import TeacherRouter from "./routes/TeachersRoute.js";
import VoiceCall from "./routes/VoiceRoute.js";


const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/", HomeRouter);
app.use('/apis', LoginUserRouter);
app.use('/apis', CreateUserRouter);
app.use('/apis', StudentRouter);
app.use('/apis', TeacherRouter);
app.use('/apis', VoiceCall);

app.listen(PORT, (error) => {
    if(error){
        console.log(error.message);
    }else{
        console.log(`SERVER STARTED ON PORT ${PORT}`);
    };
});



