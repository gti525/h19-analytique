import {getRepository} from "typeorm";
import { Campaign } from "../entity/campaign.entitiy";
export class CampaignRepo {

    public static async findById(id:number): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.findOne(id);
    }

    public static async findAll(): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.find();
    }

    /**
     * Where parameter is not working yet as of 19 of december 2018, it was still on the low priority bug to fix.
     * for now, service will filter the request
     * @param Campaign type of campaign
     */
    public static async getAll(): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.find({ relations: ["websiteurls"]});

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
    public static async delete(filter: any){
        const campaignRepo = getRepository(Campaign);
        await campaignRepo.delete(filter);
    }
}