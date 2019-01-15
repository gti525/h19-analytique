import { UserRepo } from "../DB/repo/user.repo";
import { TokenService } from "./token.service";
import { User } from "../DB/entity/user.entitiy";
var sha1 = require('sha1');

export class UserService {
    public async adduser(user: User): Promise<User> {
        user.password = sha1(user.password);
        return await UserRepo.create(user);
    }
    public async authenticate(id: number,password: string): Promise<string> {
        const user = await UserRepo.findById(id);
        if (user && user.password === sha1(password)){
            return TokenService.createToken(user.id, user.role)
        }
        throw new Error('Invalid password or username');
    }
}