import { User } from "../schema/User";
import IUser from "../interfaces/IUser";

export class UserRepository {
    async createUser(userData: IUser): Promise<IUser>{
        const user = new User(userData );
        console.log('userData:vdsz',userData);
        const savedUser = user.save()
        return savedUser
    }

    async findUserByEmail(email: string): Promise<IUser | null>{
        console.log("!!! find user exist")
        const user = await User.findOne({email}).lean();
        return user
    }
}