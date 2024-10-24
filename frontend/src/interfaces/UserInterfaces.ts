export interface UserUpdateForm {
    name:string;
    email?:string;
    image?:string,
    dob?:Date,
    bio?:string
}

export interface SignUpFormData {
    name: string;
    email: string;
    password: string
}
export interface LoginFormData {
    email : string;
    password : string;
}