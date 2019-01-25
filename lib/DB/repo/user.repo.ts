import { User } from "../../DB/entity/user.entitiy";
import {getRepository} from "typeorm";
export class UserRepo {

    public static async findByUsername(username:string): Promise<User>{
        const userRepository = getRepository(User);
        return await userRepository.findOne({ where: { username: username }});
    }

    public static async findById(id:number): Promise<User>{
        const userRepository = getRepository(User);
        return await userRepository.findOne(id);
    }
    public static async create(user: User): Promise<User>{
        const userRepository = getRepository(User);
        return await userRepository.save(user);
    }
    public static async delete(id: number){
        const userRepository = getRepository(User);
        const userToDelete  = await UserRepo.findById(id);
        if (userToDelete)
            await userRepository.delete(userToDelete);
    }
}