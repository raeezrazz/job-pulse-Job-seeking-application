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

export const signUp = async(formData: SignUpFormData) =>{
    return await apiClient.post("/user/register",{
        formData,
    }); 
}