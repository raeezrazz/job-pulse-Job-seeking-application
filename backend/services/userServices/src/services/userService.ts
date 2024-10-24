import { changePassword, updateUserDetails } from './../../../../../frontend/src/api/userApi';
import { OtpRepository } from './../repositories/OtpRepository';
import { UserRepository } from './../repositories/UserRepository';

import {IUser ,IUpdatedUser}from "../interfaces/IUser";
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

    async login(email:string , enterdPassword:string): Promise<{userData:any; accessToken:string ; refreshToken :string}> {
        const user = await this.userRepository.findUserByEmail(email);
        if(!user){
            throw new Error("Invalid email ")
        }
        console.log("checking password")
        const isPassword = await bcrypt.compare(enterdPassword, user.password ?? '');
        console.log(isPassword,"here is the result")

        if(!isPassword){
            throw new Error("Invalid Email or Password")
        }
        const userId:string = user._id.toString()
        const accessToken = generateAccessToken(userId)
        const refreshToken = generateRefreshToken(userId)
        const {password, ...userWithoutPassword} = user
        console.log(userWithoutPassword,"Dfadsfa")
        return {userData:userWithoutPassword , accessToken , refreshToken}
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
        const verifiedUser = await this.userRepository.verifyUserUpdate(email)  
        if(!verifiedUser){
            return false
        }   
        const {password,...userWithoutPassword} = verifiedUser.toObject()
        return userWithoutPassword  
    }

    async getUserData(email:string):Promise<IUser>{
        const userData = await this.userRepository.getUserData(email)
        if(!userData){
            throw new Error("User not found")
        }
        return userData
    }

    async changePassword(email: string, oldPassword: string, newPassword: string): Promise<any> {
        const user = await this.userRepository.findUserByEmail(email);
        
        if (!user) {
          return {
            success: false,
            message: "User not found",
            statusCode: 404,
          };
        }
      
        if (!user.password) {
          return {
            success: false,
            message: "User does not have a password set",
            statusCode: 400,
          };
        }
      
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        
        if (!isPasswordValid) {
          return {
            success: false,
            message: "Incorrect old password",
            statusCode: 400,
          };
        }
      
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
      
        // Update the user's password
        const result = await this.userRepository.updatePassword(user.email, hashedPassword);
      
        if (result) {
          return {
            success: true,
            message: "Password updated successfully",
            statusCode: 200,
          };
        }
      
        return {
          success: false,
          message: "Failed to update password",
          statusCode: 500,
        };
      }


      async updateUserDetails(updatedDetails: IUpdatedUser): Promise<any> {
        try {
          const response = await this.userRepository.updateUser(updatedDetails);
      
          if (response === true) {
            return {
              success: true,
              message: "User details updated successfully",
            };
          } else {
            return {
              success: false,
              message: "User update failed. No matching user found or update was unsuccessful.",
            };
          }
        } catch (error) {
          console.log("Error in updating user details:", error);
          return {
            success: false,
            message: "An error occurred while updating user details",
            error: error, 
          };
        }
      }
      
      

}