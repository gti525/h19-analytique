import { BannerId, BannerSize } from "../models/enums/banner-id-enum";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { Banner } from "../DB/entity/banner.entity";
import { BannerType, Campaign } from "../DB/entity/campaign.entity"
import { UserService } from "./user.service";
import { Client } from "../DB/entity/client.entity";
import { User } from "../DB/entity/user.entitiy";
import { ClientService } from "./client.service";
import { ClientStats } from "../DB/entity/clientStats";
var sha1 = require('sha1');

export class AdvertismentService {
    private userService = new UserService();
    private clientService = new ClientService();
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    public async getBanner(clientId, bannerType, userId,url): Promise<any> {
        const response: any = {};
        response.bannerId = bannerType;
        const client = await this.clientService.getClientByHashOrId(clientId)
        const banner = await this.findTargeterBanner(clientId, bannerType);
        const user = await this.userService.findById(userId);
        if (!banner)
            return undefined;
        response.url = banner.url;
        response.img = banner.image;
        response.size = this.getBannerSize(bannerType);
        await this.updateBannerStatistics(client, user, url, banner);
        return response;
    }
    public async updateBannerStatistics(client: Client, user: User, url: any, banner: Banner,isClick = false) {
        await this.updateUserStatistics(client, user,isClick);
        await this.addClientStatistic(client, url, banner,isClick);
    }

    private async addClientStatistic(client: Client, url: string, banner: Banner, isClick = false) {
        if (client) {
            const stats = new ClientStats();
            stats.url = url;
            stats.banner = banner;
            stats.isClick = isClick;
            stats.isView = !isClick;
            client.clientStats.push(stats);
            await this.clientService.updateClient(client);
        }
        else{
            throw new Error("CLIENT WAS NOT FOUND WHEN ADDING STATISTIC")
        }
    }

    
    private async updateUserStatistics(client: Client, user: User, isClick = false) {
        if (client && user){
            if (isClick){
                client.isTargettable ? user.income.targetedViews-- : user.income.regularViews--;
                client.isTargettable ? user.income.targetedClicks-- : user.income.regularClicks--;
            }
            else {
                client.isTargettable ? user.income.targetedViews++ : user.income.regularViews++;
            }
            await this.userService.updateUser(user);
        }
        else{
            throw new Error(`CLIENT OR USER WAS NOT FOUND ON UPDATE client : ${client} ::::: user : ${user}`)
        }
    }

    /**
     * La logique des banières va se faire ici.
     * @param clientId le id du client qui appelle la pub
     */
    private async findTargeterBanner(clientId, bannerType): Promise<Banner> {

        const campaigns = await this.getTargetedCampaigns(clientId);
        const max = campaigns.length;
        if (max < 1)
            return;
        let banner: Banner;
        const index = Math.floor(Math.random() * max);
        switch (bannerType) {
            case BannerId.vertical:
                banner = campaigns[index].banners.find(b => b.type === BannerType.Verticale)
                break;
            case BannerId.horizontal:
                banner = campaigns[index].banners.find(b => b.type === BannerType.Horizontale)
                break;
            case BannerId.mobile:
                banner = campaigns[index].banners.find(b => b.type === BannerType.Mobile)
                break;
        }
        if (banner)
            return banner;
        else
            throw new Error("No banner " + bannerType + " was found for this campain : " + JSON.stringify(campaigns[max]));
    }

    private async getTargetedCampaigns(clientId): Promise<Campaign[]> {
        // TODO aller chercher les bannières ciblées
        return await CampaignRepo.findAll();
    }

    private getBannerSize(bannerId): any {
        const size: any = {};
        switch (bannerId) {
            case BannerId.vertical:
                size.height = BannerSize.verticalHeight;
                size.width = BannerSize.verticalWidth;
                break;
            case BannerId.horizontal:
                size.height = BannerSize.horizontalHeight;
                size.width = BannerSize.horizontalWidth;
                break;
            case BannerId.mobile:
                size.height = BannerSize.mobileHeight;
                size.width = BannerSize.mobileWidth;
                break;
        }
        return size;
    }

}