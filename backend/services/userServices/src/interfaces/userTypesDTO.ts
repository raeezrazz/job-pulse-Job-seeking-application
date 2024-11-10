import { Document } from "mongoose";

export interface RegisterUserDTO extends Document {
    username: string;
    email: string;
    password: string;
}