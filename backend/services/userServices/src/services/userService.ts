import { OtpRepository } from './../repositories/OtpRepository';
import { UserRepository } from './../repositories/UserRepository';

import IUser from "../interfaces/IUser";
import bcrypt from "bcryptjs"; 
import { generateAccessToken,generateRefreshToken } from '../utils/jwt/generateToken';

export class UserService {

    private userRepository:UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }

    async userExist(email: string): Promise<IUser | null>{
        console.log("user Exist")
        const user = await this.userRepository.findUserByEmail(email)
        console.log("here at the finding",user)
        if(user){
            return user
        }
        return null
    }

   

    async registerUser(userData: IUser): Promise<{user:IUser; accessToken:string; refreshToken : string}>{
        console.log("UserService reached for registering",userData)
        const user = userData

        const hashedPassword = await bcrypt.hash(userData.password ?? '',10)
        const userToCreate = {...userData , password : hashedPassword}

        console.log(hashedPassword,userToCreate)

        const newUser = await this.userRepository.createUser(userToCreate as IUser)
        console.log(newUser,"jaoivcx")

        const userId:string = newUser._id.toString()
        const accessToken = generateAccessToken(userId)
        const refreshToken = generateRefreshToken(userId)
        console.log(accessToken,refreshToken,"ausof")

        const {password, ...userWithoutPassword} = newUser.toObject();

        return {user:userWithoutPassword,accessToken , refreshToken}
    }

    async verifyUser(email:string):Promise<any>{
        const changeStatus = await this.userRepository.verifyUserUpdate(email)  
        if(!changeStatus){
            return false
        }    
        return true  
    }

}