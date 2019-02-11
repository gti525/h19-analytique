import { CampaignRepo } from "../DB/repo/campaign.repo";
import {Campaign} from "../DB/entity/campaign.entity";

export class CampaignService {
    public async getCampaigns() : Promise<Campaign[]> {
        return await CampaignRepo.findAll();
    }

    public async getCampaignById(id: number): Promise<Campaign> {
        return await CampaignRepo.findById(id);
    }


    public async addCampaign(campaign: Campaign): Promise<Campaign> {
        return await CampaignRepo.createOrUpdate(campaign);
    }

    public async updateCampaign(campaign: Campaign): Promise<Campaign> {
        return await CampaignRepo.createOrUpdate(campaign);
    }

    public async deleteCampaign(id: number): Promise<Campaign>{
        return await CampaignRepo.deleteById(id);
    }
}