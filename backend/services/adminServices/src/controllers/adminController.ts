import { AdminServices } from './../services/adminServices';
import { Request,Response } from "express"


export class AdminController{
    private adminServices :AdminServices

    constructor(){
        this.adminServices = new AdminServices()
    }



    public adminLogin = async (req:Request , res: Response):Promise<any>=>{
       try {
        
        const {email , password}= req.body

        const adminData  = await this.adminServices.adminLogin(email,password)
        console.log(adminData,"here is the final data")
        if(adminData){
            return res.status(200).json({
                success:true,
                message:"Admin login successfull",
                data:adminData
            })
        }

       } catch (error) {
            return res.status(404)
            .json({
                success:false,
                message:"admin login failed"
            })
       }
    }

}