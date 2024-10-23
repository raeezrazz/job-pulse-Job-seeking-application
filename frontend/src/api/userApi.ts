import apiClient from "./apiClient/axios";

interface FormData {
    name:string;
    email: string;
    password: string
}

interface SignUpFormData {
    name: string;
    email: string;
    password: string
}
interface LoginFormData {
    email : string;
    password : string;
}

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
export const getUserData = async(userId:string)=>{
    return await apiClient.post('user/getUserData',{userId})
}
export const changePassword = async(email:string |any ,oldPassword:string , newPassword:string)=>{
    return await apiClient.patch('/user/changePassword',{email ,oldPassword,newPassword})
}