import mongoose from "mongoose"
export let dbInstance:typeof mongoose;

export default async ()=>{
try {
    
    if('mongodb://localhost:27017/jobpulse'){
        dbInstance = await mongoose.connect('mongodb://localhost:27017/jobpulse');
        console.log('user-service DB connected')
    }else{
        throw new Error("Mongodb_url is not defined")
    }
} catch (error) {
    console.log("db_connect is failed" + error)
}
}