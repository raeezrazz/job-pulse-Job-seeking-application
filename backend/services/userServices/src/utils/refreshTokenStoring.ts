import { Response } from "express";

export const setRefreshTokenCookie = (res:Response , refreshToken:string)=>{
    res.cookie('refreshToken',refreshToken,{
        httpOnly: true,
        secure: true,
        

    })
}