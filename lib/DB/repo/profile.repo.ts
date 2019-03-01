import {getRepository} from "typeorm";
import { Profile } from "../entity/profile.entitiy";
import { User } from "../entity/user.entitiy";
import { WebSiteUrl } from "DB/entity/websiteurl.entity";
import { WebsiteurlRepo } from "./websiteurl.repo";
export class ProfileRepo {
    public static async findUserProfile(user: User):Promise<Profile[]> {
        const profileRepo = getRepository(Profile);
        return await profileRepo.find({ where: {user}, relations: ["urls"] });
    }

    public static async findById(id:number): Promise<Profile>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.createQueryBuilder("profile")
            .leftJoinAndSelect("profile.campaigns", "campaign")
            .leftJoinAndSelect("profile.urls", "urls")
            .whereInIds([id])
            .getOne();
    }

    public static async findAll(filter?: any): Promise<Profile[]>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.find({ where: filter, relations: ["urls"] });
    }

    public static async createOrUpdate(profile: Profile): Promise<Profile>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.save(profile);
    }

    public static async delete(profileToDelete: Profile): Promise<Profile>{
        console.log('delete')
        const profileRepo = getRepository(Profile);
        if (profileToDelete)
            return await profileRepo.remove(profileToDelete);
    }
}