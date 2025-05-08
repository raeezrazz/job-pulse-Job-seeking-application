import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB";
import router from "./routes/userRouter";
import {errorHandler} from "./middlewares/errorHandlerMiddleware"

import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config();
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
connectDB()

app.use(cookieParser())


app.use('/user',router)

app.use(errorHandler)


const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`user service port : ${PORT}`)
})