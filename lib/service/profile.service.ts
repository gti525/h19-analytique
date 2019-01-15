import { Profile } from "../DB/entity/profile.entitiy";
import { ProfileRepo } from "../DB/repo/profile.repo";

export class ProfileService {
    public async addProfile(profile: Profile): Promise<Profile> {
        return await ProfileRepo.createOrUpdate(profile);
    }

    public async updateProfile(profile: Profile): Promise<Profile> {
        return await ProfileRepo.createOrUpdate(profile);
    }

    public async getProfileById(id: number): Promise<Profile> {
        return await ProfileRepo.findById(id);
    }

    public async getProfileByType(profile: string): Promise<Profile> {
        const profiles = await ProfileRepo.getAll()
        if (profiles && profiles.length > 0){
            return profiles.find((p: Profile) => p.profile === profile);
        }
        return undefined;
    }

    public async deleteProfile(id: number): Promise<Profile>{
        return await ProfileRepo.deleteById(id);
    }
        
    public async isProfileValid(profile: any,isUpdate: boolean): Promise<boolean>{
        if (profile.profile){
            if (isUpdate && profile.id){
                return await this.getProfileById(profile.id) !== undefined
            }
            else {
                return await this.getProfileByType(profile.profile) === undefined
            }
        }
        return false;
    }
}