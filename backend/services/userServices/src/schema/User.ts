import mongoose , {Schema} from "mongoose"
import IUser from "../interfaces/IUser"


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
    isVerified:{
        type:Boolean,
        default:false
    }
})

export const User = mongoose.model<IUser>("User",UserSchema)