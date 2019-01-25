import {getRepository} from "typeorm";
import { Profile } from "../entity/profile.entitiy";
export class ProfileRepo {

    public static async findById(id:number): Promise<Profile>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.findOne(id);
    }

    public static async findAll(): Promise<Profile[]>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.find();
    }

    /**
     * Where parameter is not working yet as of 19 of december 2018, it was still on the low priority bug to fix.
     * for now, service will filter the request
     * @param profile type of profile
     */
    public static async getAll(): Promise<Profile[]>{
        const profileRepo = getRepository(Profile);
        return await profileRepo.find({ relations: ["websiteurls"]});

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