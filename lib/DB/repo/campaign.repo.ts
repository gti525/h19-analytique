import {getRepository} from "typeorm";
import {Campaign} from "../entity/campaign.entity";
export class CampaignRepo {

    public static async findById(id:number): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.findOne(id);
    }

    public static async findAll(): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.find({ relations: ["banners"] });
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
}