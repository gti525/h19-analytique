import { UserRepo } from "../DB/repo/user.repo";
import { TokenService } from "./token.service";
import { User } from "../DB/entity/user.entitiy";

export class UserService {
    public async adduser(user: User): Promise<User> {
        return UserRepo.create(user);
    }
    // TODO hasher le password
    public async authenticate(id: number,password: string): Promise<string> {
        console.log('authenticating',id,password)
        const user = await UserRepo.findById(id);
        console.log(user);
        if (user && user.password === password){
            return await TokenService.createToken(user.id, user.role)
        }
        throw new Error('Invalid password or username');
        
    }

    public async isAuthenticated(user: User)
    {
        throw new Error("Not implemented");
    }
}