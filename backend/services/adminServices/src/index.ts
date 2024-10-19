import  cookieParser  from 'cookie-parser';
import  dotenv  from 'dotenv';
import express from "express";
import adminRouter from './routes/adminRoute';
// import connectDB from 
import cors from "cors"


const app = express()

app.use(express.json());
app.use(cors({origin:'http://localhost:5173'}))
app.use(cookieParser());

app.use('/admin',adminRouter);

const PORT = process.env.ADMIN_PORT ||5002

app.listen(PORT,()=>{
    console.log(`admin service in runnning : ${PORT}`)
})