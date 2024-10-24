import apiClient from "./apiClient/axios";
import { UserUpdateForm , SignUpFormData, LoginFormData } from "../interfaces/UserInterfaces";




export const signUp = async(formData: SignUpFormData) =>{
    return await apiClient.post("/user/register",formData,); 
}
export const login = async(formData: LoginFormData)=>{
    return await apiClient.post("/user/login",formData)
}

export const resentOtp = async(email:string) =>{
    return await apiClient.post("/user/resentOtp",{email})
}

export const verifyOtp = async(otp:number, email:string)=>{
    return await apiClient.post("/user/verifyOtp",{email,otp})
}
export const getUserData = async(email:string)=>{
    return await apiClient.post('user/getUserData',{email})
}
export const changePassword = async(email:string |any ,oldPassword:string , newPassword:string)=>{
    return await apiClient.patch('/user/changePassword',{email ,oldPassword,newPassword})
}
export const updateUserDetails = async(userData:UserUpdateForm)=>{
    return await apiClient.patch('/user/updateUser',{userData})
}