import {getRepository} from "typeorm";
import { Campaign } from "../entity/campaign.entitiy";
export class CampaignRepo {

    public static async findById(id:number): Promise<Campaign>{
        const CampaignRepo = getRepository(Campaign);
        return await CampaignRepo.findOne(id);
    }

    public static async findAll(): Promise<Campaign[]>{
        const CampaignRepo = getRepository(Campaign);
        return await CampaignRepo.find();
    }

    /**
     * Where parameter is not working yet as of 19 of december 2018, it was still on the low priority bug to fix.
     * for now, service will filter the request
     * @param Campaign type of campaign
     */
    public static async getAll(): Promise<Campaign[]>{
        const CampaignRepo = getRepository(Campaign);
        return await CampaignRepo.find({ relations: ["websiteurls"]});

    }
    public static async createOrUpdate(campaign: Campaign): Promise<Campaign>{
        const CampaignRepo = getRepository(Campaign);
        return await CampaignRepo.save(campaign);
    }
    public static async deleteById(id: number){
        const CampaignRepo = getRepository(Campaign);
        const campaignToDelete  = await CampaignRepo.findById(id);
        if (campaignToDelete)
            return await CampaignRepo.remove(campaignToDelete);
    }
    public static async delete(filter: any){
        const CampaignRepo = getRepository(Campaign);
        await CampaignRepo.delete(filter);
    }
}