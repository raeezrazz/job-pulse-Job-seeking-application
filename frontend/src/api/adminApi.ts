
import adminClient from "./apiClient/adminAxios"
import apiClient from "./apiClient/userAxios"

interface LoginData {
    email:string,
    password:string
}

export const adminLogin =async(FormData:LoginData)=>{
    console.log("here reahed i admin login api")
    return await adminClient.post('/admin/login',FormData)
}

export const loadUsers = async()=>{
    return await apiClient.get('/user/loadUsers')
}