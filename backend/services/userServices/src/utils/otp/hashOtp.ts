import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config()

export const hashOtp = async (otp : string):Promise<string>=>{
    const saltRounds = parseInt(process.env.SALTROUND || '10', 10);
    return await bcrypt.hash(otp, saltRounds )
}
export const compareOtp = async (otp: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(otp, hash);
  };