import { changePassword, updateUserDetails } from './../../../../../frontend/src/api/userApi';
import { OtpRepository } from './../repositories/OtpRepository';
import { UserRepository } from './../repositories/UserRepository';

import {IUser ,IUpdatedUser}from "../interfaces/userTypes";
import bcrypt from "bcryptjs"; 
import { generateAccessToken,generateRefreshToken , decodeAccessTokenData } from '../utils/jwt/generateToken';
import { RegisterUserDTO } from '../interfaces/userTypesDTO';
import { hashPassword } from '../utils/bcrypt/passwordHash';


export class AuthService {
    private userRepository : UserRepository

    constructor(){
        this.userRepository = new UserRepository()
    }
    async registerUser(userData: RegisterUserDTO): Promise<IUser> {
        const { username, email, password } = userData;
      
        const existUser = await this.userRepository.findUserByEmail(email);
        if (existUser) {
          throw new Error('User with email already exists');
        }
      
        const hashedPassword = await hashPassword(password);
      
        const userToCreate = { ...userData, password: hashedPassword };
      
        console.log(hashedPassword, userToCreate);
      
        const newUser = await this.userRepository.createUser(userToCreate as IUser);
        console.log(newUser, 'new user created');
      
        const userId: string = newUser._id.toString();
     
      
        const userWithoutPassword = newUser.toObject();
        const { password: hashedPasswordFromDb, ...userWithoutPasswordDetails } = userWithoutPassword;
      
        return  userWithoutPasswordDetails;
      }
}