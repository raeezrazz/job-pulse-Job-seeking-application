import  cookieParser  from 'cookie-parser';
import  dotenv  from 'dotenv';
import express from "express";
import adminRouter from './routes/adminRoute';
// import connectDB from 
import cors from "cors"

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
  
  }));
app.use(cookieParser());
app.use('/user',(req,res)=>{
  console.log("here admin receive this")
  res.send("admin api is here")
})



app.use('/admin',adminRouter);

const PORT = process.env.ADMIN_PORT ||5002

app.listen(PORT,()=>{
    console.log(`admin service in runnning : ${PORT}`)
})