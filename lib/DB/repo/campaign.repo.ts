import {getRepository} from "typeorm";
import {Campaign} from "../entity/campaign.entity";
import {Banner} from "../entity/banner.entity";
export class CampaignRepo {

    public static async findById(id:number): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.findOne(id, { relations: ["banners", "profiles"] });
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
            await CampaignRepo.deleteBanners(campaignToDelete.banners);
            return await campaignRepo.remove(campaignToDelete);
    }

    public static async deleteBanners(banners: Banner[]): Promise<Banner[]>{
        const bannerRepo = getRepository(Banner);
        return await bannerRepo.remove(banners);
    }
}