import {getRepository} from "typeorm";
import {Campaign} from "../entity/campaign.entity";
import {Banner} from "../entity/banner.entity";
import { User } from "../entity/user.entitiy";
export class CampaignRepo {

    public static async findById(id:number): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.findOne(id, { relations: ["banners", "profiles"] });
    }

    public static async findByUser(user:User): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.find({where: {user}, relations: ["banners", "profiles"] });
    }


    public static async findAll(): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.find({ relations: ["banners", "profiles"] });
    }

    public static async createOrUpdate(campaign: Campaign): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.save(campaign);
    }

    public static async deleteById(id: number){
        const campaignRepo = getRepository(Campaign);
        const campaignToDelete  = await CampaignRepo.findById(id);
        if (campaignToDelete)
            return await campaignRepo.remove(campaignToDelete);
    }

    public static async deleteBanners(banners: Banner[]): Promise<Banner[]>{
        const bannerRepo = getRepository(Banner);
        return await bannerRepo.remove(banners);
    }
}