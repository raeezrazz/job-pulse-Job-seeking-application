import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config()

export const hashPassword = async (password : string):Promise<string>=>{
    const saltRounds = parseInt(process.env.SALTROUND || '10', 10);
    return await bcrypt.hash(password, saltRounds )
}
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
  };