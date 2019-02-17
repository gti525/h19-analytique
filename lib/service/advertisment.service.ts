import { BannerOrientation, BannerSize } from "../models/enums/banner-id-enum";
import { CampaignRepo } from "../DB/repo/campaign.repo";
import { Banner } from "../DB/entity/banner.entity";
import { BannerType, Campaign } from "../DB/entity/campaign.entity"
import { Client } from "../DB/entity/client.entity";
import { ClientStatistic } from "../DB/entity/clientStats";
import { ClientStatisticsService } from "./clientStatistics.service";
import * as moment from 'moment';
import { In } from "typeorm";
import { WebsiteurlService } from "./websiteurl.service";
import { ClientService } from "./client.service";
import * as _ from 'lodash'

export class AdvertismentService {
    private webSiteUrlService = new WebsiteurlService();
    private clientService = new ClientService()
    private clientStatisticsService = new ClientStatisticsService()
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    public async getBanner(client: Client, bannerType, url): Promise<any> {
        const response: any = {};
        const banner = await this.findTargeterBanner(client, bannerType);
        if (!banner)
        return undefined;
        response.url = banner.url;
        response.img = banner.image;
        response.bannerId = banner.id;
        response.bannerType = bannerType;

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
        let targettedCampaigns = undefined;
        const tagettedUrls: string[] = this.getTargettedUrls(client);

        const campaigns = (await CampaignRepo.findAll()).filter(c => moment(c.endDate).endOf('day').isSameOrBefore(new Date()) && 
            moment(c.startDate).startOf('day').isSameOrAfter(new Date())
        );
        console.log(tagettedUrls.length)
        const webSiteUrls = await this.webSiteUrlService.findProfilesByUrl({url: In(tagettedUrls)})
        console.log(campaigns.length)
        console.log(webSiteUrls.length)
        console.log("avant la boucle",campaigns && webSiteUrls)
        if (campaigns && webSiteUrls){
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
        client.isTargettable = !_.isEmpty(targettedCampaigns);
        this.clientService.updateClient(client);
        return _.isEmpty(targettedCampaigns) ? campaigns : targettedCampaigns;
    }

    private getTargettedUrls(client: Client):string[] {
        const url_visits = {};
        const tagettedUrls: string[] = [];
        // grouping urls and counting the number of occurences
        client.clientStats.forEach(s => {
            url_visits[s.url] = (url_visits[s.url] || 0) + 1;
        });
        // if 10 or more visits
        Object.keys(url_visits).forEach(k => {
            if (url_visits[k] > 20) {
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