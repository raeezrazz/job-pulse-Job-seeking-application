import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB";
import router from "./routes/userRouter";

import cors from "cors"
import cookieParser from "cookie-parser"
const app = express();

dotenv.config();

connectDB()

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}))
app.use(cookieParser())

app.use('/api/user',router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`user service port : ${PORT}`)
})