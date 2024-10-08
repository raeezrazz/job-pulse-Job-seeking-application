import { Otp } from '../schema/Otp';
import { IOtp } from '../interfaces/IOtp';


export class OtpRepository {

    async storeOtp(otpData: IOtp){
        const otp = new Otp(otpData);
        return await otp.save()
    }
    async findOtp(email:string){
        return await Otp.findOne({email});
    }
    async removeOtp(email:string){
        await Otp.deleteOne({email})
    }
}