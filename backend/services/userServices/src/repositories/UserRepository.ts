import { User } from "../schema/User";
import IUser from "../interfaces/IUser";

export class UserRepository {
  async createUser(userData: IUser): Promise<IUser> {
    const user = new User(userData);
    console.log("userData:vdsz", userData);
    const savedUser = user.save();
    return savedUser;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    console.log("!!! find user exist");
    const user = await User.findOne({ email }).lean();
    return user;
  }

  async verifyUserUpdate(email: string): Promise<any> {
    try {
      await User.findOneAndUpdate({ email }, { isVerified: true });
      return true;
      
    } catch (error) {
      console.log("verify Otp status changing failed", error);
    }
  }
}
