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

export class AdvertismentService {
    private webSiteUrlService = new WebsiteurlService();
    private clientService = new ClientService()
    private clientStatisticsService = new ClientStatisticsService()
    
    /**
     * Retourne les bannieres ciblees
     */
    public async getBanner(client: Client, user:User, bannerType, url): Promise<any> {
        const response: any = {};
        const banner = await this.findTargeterBanner(client, bannerType);
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

    private async findTargeterBanner(client: Client, bannerType): Promise<Banner> {
        const campaigns = await this.getTargetedCampaigns(client);

        const max = campaigns.length;
        if (max < 1)
            throw new Error("No banners found!");
        let banner: Banner;
        const index = Math.floor(Math.random() * max);
        switch (bannerType) {
            case BannerOrientation.vertical:
                banner = campaigns[index].banners.find(b => b.type === BannerType.Verticale)
                break;
            case BannerOrientation.horizontal:
                banner = campaigns[index].banners.find(b => b.type === BannerType.Horizontale)
                break;
            case BannerOrientation.mobile:
                banner = campaigns[index].banners.find(b => b.type === BannerType.Mobile)
                break;
        }
        if (banner)
            return banner;
        else
            throw new Error("No banner " + bannerType + " was found for this campain : " + JSON.stringify(campaigns.map(c => c)));
    }

    private async getTargetedCampaigns(client: Client): Promise<Campaign[]> {
        client.isTargeted = false;
        let targettedCampaigns = undefined;
        
        const campaigns = (await CampaignRepo.findAll()).filter(c => moment(new Date()).endOf('day').isSameOrBefore(c.endDate) 
        && moment(new Date()).startOf('day').isSameOrAfter(c.startDate));
        
        const tagettedUrls: string[] = this.getTargettedUrls(client);
        const webSiteUrls = (await this.webSiteUrlService.findProfilesByUrl(tagettedUrls)).filter(p => !_.isEmpty(p.profile));
        if (campaigns.length > 0  && webSiteUrls.length > 0){
            //finding the existing campaings that have profiles that matches the urls
            targettedCampaigns = campaigns.map(c =>{
                for(const w of webSiteUrls){
                    for (const  profile of c.profiles){
                        if (profile.id === w.profile.id){
                            return c;
                        }
                    }
                }
            })
        }
        client.isTargeted =  !_.isEmpty(targettedCampaigns);
        return _.isEmpty(targettedCampaigns) ? campaigns : targettedCampaigns;
    }

    private getTargettedUrls(client: Client):string[] {
        const url_visits = {};
        const minimumNumberOfVisits = 10;
        const tagettedUrls: string[] = [];
        // grouping urls and counting the number of occurences
        for (const stat of client.clientStats){
            url_visits[stat.url] = (url_visits[stat.url] || 0) + 1;
        };
        // if 10 or more visits
        Object.keys(url_visits).forEach(k => {
            if (url_visits[k] >= minimumNumberOfVisits) {
                tagettedUrls.push(k);
            }
        });
        return tagettedUrls;
    }

    private getBannerSize(bannerType): any {
        const size: any = {};
        switch (bannerType) {
            case BannerType.Verticale:
                size.height = BannerSize.verticalHeight;
                size.width = BannerSize.verticalWidth;
                break;
            case BannerType.Horizontale:
                size.height = BannerSize.horizontalHeight;
                size.width = BannerSize.horizontalWidth;
                break;
            case BannerType.Mobile:
                size.height = BannerSize.mobileHeight;
                size.width = BannerSize.mobileWidth;
                break;
        }
        return size;
    }

}