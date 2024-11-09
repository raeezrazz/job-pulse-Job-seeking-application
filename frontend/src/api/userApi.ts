import apiClient from "./apiClient/userAxios";
import { UserUpdateForm , SignUpFormData, LoginFormData } from "../interfaces/UserInterfaces";




export const signUp = async(formData: SignUpFormData) =>{
    return await apiClient.post("/user/register",formData,{withCredentials:true}); 
}
export const login = async(formData: LoginFormData)=>{
    return await apiClient.post("/user/login",formData,{withCredentials:true})
}

export const resentOtp = async(email:string) =>{
    return await apiClient.post("/user/resentOtp",{email})
}

export const verifyOtp = async(otp:number, email:string)=>{
    return await apiClient.post("/user/verifyOtp",{email,otp})
}
export const getUserData = async()=>{
    return await apiClient.get('user/getUserData',{withCredentials:true})
}
export const dummy = async()=>{
    return await apiClient.get('user/dummy',{withCredentials:true})
}
export const changePassword = async(email:string |any ,oldPassword:string , newPassword:string)=>{
    return await apiClient.patch('/user/changePassword',{email ,oldPassword,newPassword})
}
export const updateUserDetails = async(userData:UserUpdateForm)=>{
    return await apiClient.patch('/user/updateUser',{userData}) 
}

export const logoutUser = async()=>{
    return await apiClient.delete('/user/logout',{withCredentials:true})
}