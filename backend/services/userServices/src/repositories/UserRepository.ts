import { User } from "../schema/User";
import {IUser,IUpdatedUser} from "../interfaces/IUser";

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

  public async getUserData(email:string):Promise<any>{
    try{
        const user = await User.findOne({email:email})
        if(!user){
             throw new Error('User not found')
        }
        return user
    }catch(error){
        console.log('userData getting failed',error)
        throw error
    }
  }

  public async updatePassword(email: string, newPassword: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        user.password = newPassword;
        await user.save();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating password");
    }
  }

  public async updateUser(newUserDetails: IUpdatedUser): Promise<boolean> {
    try {
      
      const user = await User.findOne({ email: newUserDetails.email });
      
     
      if (!user) {
        console.log("User not found");
        return false;
      }
  
      // Update the user fields
      user.name = newUserDetails.name || user.name; 
      user.dob = newUserDetails.dob || user.dob;  
      user.bio = newUserDetails.bio || user.bio;   
      user.phone = newUserDetails.phone || user.phone;   

  
     
      await user.save();

      console.log(user,"here is the repository data ")
  
      return true;
    } catch (error) {
      console.log("Error while updating User details", error);
      return false; 
    }
  }
  
}
