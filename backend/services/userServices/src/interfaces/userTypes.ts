import { Document,ObjectId } from "mongoose";

export  interface IUser extends Document{
    _id: ObjectId;
    username: string;
    email:string;
    password?:string;
    phone?:Number;
    isVerified?:boolean;
    isAdmin:boolean;
    dob?:Date,
    bio?:string

}

export  interface IUpdatedUser extends Document{
    username:string;
    email:string;
    image?:string,
    dob?:Date,
    phone?:Number,
    bio?:string
}