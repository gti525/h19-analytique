import { UserRepo } from "../DB/repo/user.repo";
import { TokenService } from "./token.service";
import { User } from "../DB/entity/user.entitiy";
import { UserRoles } from "../models/enums/role-enums";
var sha1 = require('sha1');

export class UserService {
    private tokenService: TokenService
    constructor(){
        this.tokenService = TokenService.getInstance();
    }
    public async adduser(user: User): Promise<User> {
        user.password = sha1(user.password);
        if (user.role === UserRoles.WEBSITEADMIN){
            const savedUser = await UserRepo.createOrUpdate(user);
            user.analyticToken = this.tokenService.createToken(savedUser.id)
        }
        return await UserRepo.createOrUpdate(user);
    }

    public async updateUser(user: User): Promise<User> {
        return await UserRepo.createOrUpdate(user);
    }
    public async authenticate(username: string,password: string): Promise<User> {
        const user = await UserRepo.findByUsername(username);
        if (user && user.password === sha1(password)){
            return user;
        }
        throw new Error('Invalid password or username');
    }

    public async userExists(id){
        return await UserRepo.findById(id) != undefined;
    }

    public async findByToken(token): Promise<User>{
        return token ? await UserRepo.findByToken(token) : undefined;
    }

    public async findById(id): Promise<User>{
        return id ? await UserRepo.findById(id) : undefined;
    }
}