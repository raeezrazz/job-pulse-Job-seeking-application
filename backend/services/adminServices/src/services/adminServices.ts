import { adminLogin } from './../../../../../frontend/src/api/adminApi';
import { AdminRepository } from './../repositories/AdminRepository';

export class AdminServices {
    
    private adminRepository:AdminRepository

    constructor(){
        this.adminRepository = new AdminRepository()
    }

    async adminLogin(email:string , password:string):Promise<any>{
        console.log("admin service")

        const validateAdmin = await this.adminRepository.validateAdmin(email,password)
        console.log(validateAdmin,"here is the 2nd")
        if(!validateAdmin){
            console.log("inside")
             throw new Error('Admin login failed')
        }
        return validateAdmin
    }
}