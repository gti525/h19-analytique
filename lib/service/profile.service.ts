import { Profile } from "../DB/entity/profile.entitiy";
import { ProfileRepo } from "../DB/repo/profile.repo";

export class ProfileService {
    public async getProfiles(filter?: any) : Promise<Profile[]> {
        return await ProfileRepo.findAll(filter);
    }

    public async getProfileById(id: number): Promise<Profile> {
        return await ProfileRepo.findById(id);
    }


    public async addProfile(profile: Profile): Promise<Profile> {
        return await ProfileRepo.createOrUpdate(profile);
    }

    public async updateProfile(profile: Profile): Promise<Profile> {
        return await ProfileRepo.createOrUpdate(profile);
    }

    public async deleteProfile(id: number): Promise<Profile>{
        return await ProfileRepo.deleteById(id);
    }
}