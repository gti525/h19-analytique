import {getRepository} from "typeorm";
import { Profile } from "../entity/profile.entitiy";
import { User } from "../entity/user.entitiy";
export class ProfileRepo {
    public static async findUserProfile(user: User):Promise<Profile[]> {
        const profileRepo = getRepository(Profile);
        return await profileRepo.find({ where: {user}, relations: ["urls"] });
    }

    public static async findById(id:number): Promise<Profile>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.findOne(id, { relations: ["urls"] });
    }

    public static async findAll(filter?: any): Promise<Profile[]>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.find({ where: filter, relations: ["urls"] });
    }

    public static async createOrUpdate(profile: Profile): Promise<Profile>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.save(profile);
    }

    public static async deleteById(id: number){
        const profileRepo = getRepository(Profile);
        const profileToDelete  = await ProfileRepo.findById(id);
        if (profileToDelete)
            return await profileRepo.remove(profileToDelete);
    }

    public static async delete(filter: any){
        const profileRepo = getRepository(Profile);
        await profileRepo.delete(filter);
    }
}