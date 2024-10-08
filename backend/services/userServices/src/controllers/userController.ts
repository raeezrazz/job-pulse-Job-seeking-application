import IUser from '../interfaces/IUser';
import { UserService } from './../services/userService';
import { Request,Response  } from "express";
import { OtpService } from '../services/otpService';

export class UserController {

    private userService: UserService
    private otpService: OtpService

    constructor(){
        this.userService = new UserService()
        this.otpService = new OtpService()
    }

    public registerUser = async(req:Request , res: Response):Promise<any>=> {
        
        console.log("here reacjed in register",req.body)
        try {
            const {name ,email ,password} = req.body
        
        const userExists = await this.userService.userExist(email)
        if(userExists){
            return res.status(400).json({message: "user already exist"})
        }

        //  const form:IUser = { name,email,password }
        
        const form: IUser = { name, email, password } as IUser
         const {user ,accessToken , refreshToken} = await this.userService.registerUser(form)
        
        res.cookie("jwt-refresh",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            path:"/refresh-token"
        });

        this.otpService.sendMail(email)

        return res.status(201).json({
            success:true,
            data: user,
            accessToken,
            message:"User Reguister successfull"
        })
        } catch (error) {
            return res.status(500).json({message : "server error", error})
        }

    }

}