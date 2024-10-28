

export class AdminRepository{


    public async validateAdmin(email:string,password:string):Promise<any>{
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
       
        if(adminEmail == email && adminPassword == password){
            return {adminEmail , adminPassword}
        }else{
            throw new Error("Admin Credential don't match")
        }
    }

}