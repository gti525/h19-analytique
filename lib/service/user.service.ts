import { UserRepo } from "../DB/repo/user.repo";
import { TokenService } from "./token.service";
import { User } from "../DB/entity/user.entitiy";
var sha1 = require('sha1');

export class UserService {
    private tokenService: TokenService
    constructor(){
        this.tokenService = TokenService.getInstance();
    }
    public async adduser(user: User): Promise<User> {
        user.password = sha1(user.password);
        return await UserRepo.create(user);
    }
    public async authenticate(username: string,password: string): Promise<string> {
        const user = await UserRepo.findByUsername(username);
        if (user && user.password === sha1(password)){
            return this.tokenService.createToken(user.id)
        }
        throw new Error('Invalid password or username');
    }
    public async userExists(id){
        return UserRepo.findById(id) != undefined;
    }
}