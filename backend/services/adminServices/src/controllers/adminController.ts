import { Request,Response } from "express"

export class AdminController{





    public adminLogin = async (req:Request , res: Response):Promise<any>=>{
        console.log("adminLogin is workning")
        console.log(req.body,"here is admin body")
    }

}