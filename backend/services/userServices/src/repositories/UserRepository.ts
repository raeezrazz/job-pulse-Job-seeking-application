import { User } from "../schema/User";
import {IUser,IUpdatedUser} from "../interfaces/userTypes";

export class UserRepository {
  public async createUser(userData: IUser): Promise<IUser> {
    const user = new User(userData);
    const savedUser = user.save();
    return savedUser;
  }

  public async findUserByEmail(email: string): Promise<IUser | null> {
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
        console.log(user,"here is the user")
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
      user.username = newUserDetails.username || user.username; 
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

  public async loadUsers(): Promise<any[]> {
    try {
      const users = await User.find().select('-password');
      console.log(users, "here are all the users");
      return users;
    } catch (error) {
      console.error("Error fetching users from database:", error);
      throw error;
    }
  }
  
}
