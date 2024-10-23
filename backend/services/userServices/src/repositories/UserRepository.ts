import { User } from "../schema/User";
import IUser from "../interfaces/IUser";

export class UserRepository {
  public async createUser(userData: IUser): Promise<IUser> {
    const user = new User(userData);
    console.log("userData:vdsz", userData);
    const savedUser = user.save();
    return savedUser;
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
    console.log("!!! find user exist");
    const user = await User.findOne({ email }).lean();
    return user;
  }

  public async verifyUserUpdate(email: string): Promise<any> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      user.isVerified = true;
      const updatedUser = await user.save();
      return updatedUser;

    } catch (error) {
      console.log("Verify OTP status changing failed", error);
      throw error; 
    }
  }

  public async getUserData(userId:string):Promise<any>{
    try{
        const user = await User.findOne({_id:userId})
        if(!user){
             throw new Error('User not found')
        }
        return user
    }catch(error){
        console.log('userData getting failed',error)
        throw error
    }
  }

  public async updatePassword(email:string, newPassword:string):Promise<any>{
    try {
      console.log("here is respositauh")
      const user = await User.findOne({email:email})
      if(user){
        user.password= newPassword
        await user.save()
        return true
      }
      
    } catch (error) {
      console.log(error)
    }
  }

}
