import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import LoginUserRouter from "./routes/LoginUserRouter.js";
import HomeRouter from "./routes/HomeRouter.js"

const app = express();


dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use("/", HomeRouter);
app.use('/apis', LoginUserRouter);

app.listen(PORT, (error) => {
    if(error){
        console.log(error.message);
    }else{
        console.log(`SERVER STARTED ON PORT ${PORT}`);
    };
});



