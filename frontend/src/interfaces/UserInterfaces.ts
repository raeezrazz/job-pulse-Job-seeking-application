export interface UserUpdateForm {
    name:string;
    email?:string;
    image?:string,
    dob?:Date,
    bio?:string
}

export interface SignUpFormData {
    email: string;
  password: string;
  username?: string;
}
export interface LoginFormData {
    email : string;
    password : string;
}