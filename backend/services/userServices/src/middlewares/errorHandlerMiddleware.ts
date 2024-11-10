import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError/appError";

export const errorHandler = (err:Error , req:Request, res:Response, next:NextFunction)=>{
    const statusCode = err instanceof AppError? err.statusCode : 500
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success:false,
        message,
    })
}