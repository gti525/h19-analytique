import { CampaignRepo } from "../DB/repo/campaign.repo";
import {Campaign} from "../DB/entity/campaign.entity";
import { User } from "../DB/entity/user.entitiy";

export class CampaignService {
    public async getCampaigns() : Promise<Campaign[]> {
        return await CampaignRepo.findAll();
    }

    public async getCampaignById(id: number): Promise<Campaign> {
        return await CampaignRepo.findById(id);
    }

    public async getCampaignByUser(user: User): Promise<Campaign[]> {
        return await CampaignRepo.findByUser(user);
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