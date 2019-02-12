import { BannerId, BannerSize } from "../models/enums/banner-id-enum";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { Banner } from "../DB/entity/banner.entity";
import { BannerType, Campaign } from "../DB/entity/campaign.entity"
var sha1 = require('sha1');

export class AdvertismentService {
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    public async getBanner(clientId, bannerType, userId): Promise<any> {
        // TODO Ajouter une view au user
        const response: any = {};
        response.bannerId = bannerType;
        const banner = await this.findTargeterBanner(clientId, bannerType);
        if (!banner)
            return undefined;
        response.url = banner.url;
        response.img = banner.image;
        response.size = this.getBannerSize(bannerType);
        return response;
    }

    /**
     * La logique des banières va se faire ici.
     * @param clientId le id du client qui appelle la pub
     */
    private async findTargeterBanner(clientId, bannerType): Promise<Banner> {

        const campaigns = await this.getTargetedCampaigns(clientId);
        const max = campaigns.length - 1;
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
            throw Error("No banner " + bannerType + " was found for this campain : " + JSON.stringify(campaigns[max]));
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