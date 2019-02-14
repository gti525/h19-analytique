import { BannerId, BannerSize } from "../models/enums/banner-id-enum";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { Banner } from "../DB/entity/banner.entity";
import { BannerType, Campaign } from "../DB/entity/campaign.entity"
import { Client } from "../DB/entity/client.entity";
import { ClientService } from "./client.service";
import { ClientStatistic } from "../DB/entity/clientStats";
import { ClientStatisticsService } from "./clientStatistics.service";

export class AdvertismentService {
    private clientService = new ClientService();
    private clientStatisticsService = new ClientStatisticsService()
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    public async getBanner(client: Client, bannerType, url): Promise<any> {
        const response: any = {};
        response.bannerId = bannerType;
        const banner = await this.findTargeterBanner(client, bannerType);
        if (!banner)
            return undefined;
        response.url = banner.url;
        response.img = banner.image;
        response.size = this.getBannerSize(bannerType);
        await this.addClientStatistic(client, url, banner);
        return response;
    }

    public async addClientStatistic(client: Client, url: string, banner: Banner, isClick = false) {
        if (client) {
            let stats = new ClientStatistic();
            stats.url = url;
            stats.banner = banner;
            stats.isClick = isClick;
            stats.isView = !isClick;
            stats.isTargeted = client.isTargettable;
            stats.client = client;
            stats = await this.clientStatisticsService.save(stats);
        }
        else {
            throw new Error("CLIENT WAS NOT FOUND WHEN ADDING STATISTIC")
        }

    }

    private async findTargeterBanner(client: Client, bannerType): Promise<Banner> {

        const campaigns = await this.getTargetedCampaigns(client);

        const max = campaigns.length;
        if (max < 1)
            throw new Error("No banners found!");
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
            throw new Error("No banner " + bannerType + " was found for this campain : " + JSON.stringify(campaigns));
    }

    private async getTargetedCampaigns(client: Client): Promise<Campaign[]> {
        // TODO aller chercher les bannières ciblées
        // Si jamais on est capable de cibler un client, mettre client.isTargettable a true

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