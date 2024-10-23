import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB";
import router from "./routes/userRouter";

import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config();
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:'http://localhost:5173'}))
// app.use(cors())
app.use(cookieParser())



app.use('/user',router)
// app.use('/',(req,res)=>{
//     console.log("here sis user server")
// })


connectDB()
const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=>{
    console.log(`user service port : ${PORT}`)
})