import mongoose , {Schema} from "mongoose"
import {IUser} from "../interfaces/IUser"


const UserSchema : Schema = new Schema({
    name :{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required: true
    },
    bio:{
        type:String,
        required:false
    },
    dob:{
        type:Date,
        required:false
    },
    phone:{
        type:Number,
        required:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin :{
        type :Boolean,
        default : false
    },
})

export const User = mongoose.model<IUser>("User",UserSchema)