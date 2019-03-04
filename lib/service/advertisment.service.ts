import { BannerOrientation, BannerSize } from "../models/enums/banner-id-enum";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { Banner } from "../DB/entity/banner.entity";
import { BannerType, Campaign } from "../DB/entity/campaign.entity"
import { Client } from "../DB/entity/client.entity";
import { ClientStatistic } from "../DB/entity/clientStats";
import { ClientStatisticsService } from "./clientStatistics.service";
import * as moment from 'moment';
import { WebsiteurlService } from "./websiteurl.service";
import { ClientService } from "./client.service";
import * as _ from 'lodash'
import { User } from "../DB/entity/user.entitiy";
import { BannerRepo } from "../DB/repo/banner.repo";

export class AdvertismentService {
    private webSiteUrlService = new WebsiteurlService();
    private clientService = new ClientService()
    private clientStatisticsService = new ClientStatisticsService()
    
    /**
     * Retourne les bannieres ciblees
     */
    public async getBanner(client: Client, user:User, bannerType, url): Promise<any> {
        const response: any = {};
        const [banner,isTargeted] = await this.findTargeterBanner(client, bannerType);
        client.isTargeted = isTargeted;
        if (!banner)
            return undefined;
        const clientStatistic = await this.addClientStatistic(client,user, url, banner);
        response.url = banner.url;
        response.img = banner.image;
        response.clientStatisticId = clientStatistic.id;
        response.bannerType = bannerType;
        response.size = this.getBannerSize(bannerType);
        return response;
    }

    public async addClientStatistic(client: Client,user: User, url: string, banner: Banner, isClick = false): Promise<ClientStatistic> {
        if (client) {
            let stats = new ClientStatistic();
            stats.url = url;
            stats.banner = banner;
            stats.isClick = isClick;
            stats.isView = !isClick;
            stats.isTargeted = client.isTargeted;
            stats.client = client;
            stats.user = user;
            return await this.clientStatisticsService.save(stats);
        }
        else {
            throw new Error("CLIENT WAS NOT FOUND WHEN ADDING STATISTIC")
        }

    }

    private async findTargeterBanner(client: Client, bannerType): Promise<any[]> {
        let bannerOrientation;
        switch (bannerType) {
            case BannerOrientation.vertical:
                bannerOrientation = BannerType.Verticale;
                break;
            case BannerOrientation.horizontal:
                bannerOrientation = BannerType.Horizontale;
                break;
            case BannerOrientation.mobile:
                bannerOrientation = BannerType.Mobile;
                break;
        }
        let banners = await BannerRepo.getTargettedBanners(client.id,bannerOrientation);
        let isTargeted = true;
        if(banners.length === 0){
            isTargeted = false;
            banners = await BannerRepo.getUntargettedBanners(bannerOrientation);
        }
        const max = banners.length;
        if (max < 1)
            throw new Error("No banners found!");
        return [banners[Math.floor(Math.random() * max)],isTargeted];
    }

    private getBannerSize(bannerType): any {
        const size: any = {};
        switch (bannerType) {
            case BannerOrientation.vertical:
                size.height = BannerSize.verticalHeight;
                size.width = BannerSize.verticalWidth;
                break;
            case BannerOrientation.horizontal:
                size.height = BannerSize.horizontalHeight;
                size.width = BannerSize.horizontalWidth;
                break;
            case BannerOrientation.mobile:
                size.height = BannerSize.mobileHeight;
                size.width = BannerSize.mobileWidth;
                break;
        }
        return size;
    }

}