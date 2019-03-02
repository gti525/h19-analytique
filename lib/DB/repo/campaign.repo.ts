import {getRepository} from "typeorm";
import {Campaign} from "../entity/campaign.entity";
import {Banner} from "../entity/banner.entity";
import { User } from "../entity/user.entitiy";
export class CampaignRepo {

    public static async findById(id:number): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.createQueryBuilder("campaign")
            .whereInIds([id])
            .leftJoinAndSelect("campaign.profiles", "profiles")
            .leftJoinAndSelect("campaign.banners", "banners")
            .getOne();
    }

    public static async findByUser(user:User): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.createQueryBuilder("campaign")
            .leftJoinAndSelect("campaign.profiles", "profiles")
            .leftJoinAndSelect("campaign.user", "user")
            .where(`user.id = :id`, {id: user.id})
            .leftJoinAndSelect("campaign.banners", "banners")
            .getMany();
    }


    public static async findAll(): Promise<Campaign[]>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.createQueryBuilder("campaign")
            .leftJoinAndSelect("campaign.profiles", "profiles")
            .leftJoinAndSelect("campaign.banners", "banners")
            .getMany();
    }

    public static async createOrUpdate(campaign: Campaign): Promise<Campaign>{
        const campaignRepo = getRepository(Campaign);
        return await campaignRepo.save(campaign);
    }

    public static async deleteById(campaignToDelete: Campaign){
        const campaignRepo = getRepository(Campaign);
        if (campaignToDelete)
            return await campaignRepo.remove(campaignToDelete);
    }

    public static async deleteBanners(banners: Banner[]): Promise<Banner[]>{
        const bannerRepo = getRepository(Banner);
        return await bannerRepo.remove(banners);
    }
}