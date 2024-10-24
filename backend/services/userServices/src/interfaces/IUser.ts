import { Document,ObjectId } from "mongoose";

export  interface IUser extends Document{
    _id: ObjectId;
    name: string;
    email:string;
    password?:string;
    phone?:Number;
    isVerified?:boolean;
    isAdmin:boolean;
    dob?:Date,
    bio?:string

}

export  interface IUpdatedUser extends Document{
    name:string;
    email:string;
    image?:string,
    dob?:Date,
    phone?:Number,
    bio?:string
}