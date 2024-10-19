

import apiClient from "./apiClient/axios";

interface LoginData {
    email:string,
    password:string
}

export const adminLogin =async(FormData:LoginData)=>{
    console.log("here reahed i admin login api")
    return await apiClient.post('/admin/login',FormData)
}