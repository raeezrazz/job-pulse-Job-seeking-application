import cookieParser from 'cookie-parser';
import cors  from 'cors';
import dotenv from 'dotenv';
import express  from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware'

const app = express()

dotenv.config();
const PORT = process.env.API_GATEWAY_PORT

const endpoints ={
    user:process.env.USER_API_BASE_URL,
    admin:process.env.ADMIN_API_BASE_URL
}

app.use(express.json());
app.use(cors())
// app.use(cookieParser())
const sam = ()=>{
    console.log("anj")
}



app.use('/user',createProxyMiddleware({
    target:'http://localhost:5001',
    changeOrigin:true,
    pathRewrite: {
        '^/user': '/', // This will rewrite '/user' to '/' when forwarding to the user service
    },
}))

app.use('/admin',createProxyMiddleware({
    target:endpoints.admin,
    changeOrigin:true
}))
// app.use('/user',(req,res,next)=>{
//     console.log(req.url);
//     next();
    
// })



app.listen(PORT,(()=>{
    console.log(`gatway server running at http://localhost:${PORT}`)
}))