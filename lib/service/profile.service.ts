import { Profile } from "../DB/entity/profile.entitiy";
import { ProfileRepo } from "../DB/repo/profile.repo";
import { User } from "../DB/entity/user.entitiy";

export class ProfileService {
    public async getProfiles(filter?: any) : Promise<Profile[]> {
        return await ProfileRepo.findAll(filter);
    }
    public async getProfilesByUser(user: User) : Promise<Profile[]> {
        return await ProfileRepo.findUserProfile(user);
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

    public async deleteProfile(id: number){
        const profile =  await ProfileRepo.findById(id);
        if (profile.campaigns.length > 0){
            throw new Error("Impossible de supprimer un profil qui est lié à une campagne");
        }
        return await ProfileRepo.delete(profile);
    }
}