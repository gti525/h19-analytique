import { getRepository, getManager } from "typeorm";
import { Banner } from "../entity/banner.entity";
import * as moment from 'moment';
export class BannerRepo {
    public static async getTargettedBanners(clientId: number, bannerOrientation: number): Promise<Banner[]> {
        const format = 'YYYY-MM-DD HH:mm:ss'
        return await getManager().query(
            `select distinct banner.*  FROM banner
                JOIN campaign ON campaign.id = banner.campaignsId
                JOIN campaign_profiles_profile ON campaign_profiles_profile.campaignId = campaign.id
                JOIN profile ON campaign_profiles_profile.profileId = profile.id
                JOIN web_site_url  ON profile.id = web_site_url.profileId
                JOIN client_statistic ON  client_statistic.url Like CONCAT("%", web_site_url.url, "%") 
                where client_statistic.id in (select client_statistic.id from client_statistic
                        where client_statistic.url Like CONCAT("%", web_site_url.url, "%") 
                                           group by client_statistic.clientId having count(*) > 5)
                      and client_statistic.clientId = ${clientId}
                      and banner.type = ${bannerOrientation}
                      and campaign.endDate > '${moment(new Date()).endOf('day').format(format)}'
                      and campaign.startDate < '${moment(new Date()).startOf('day').format(format)}';`
        ) as Banner[]
    }

    public static async findById(id: number): Promise<Banner> {
        const bannerRepo = getRepository(Banner);
        return await bannerRepo.findOne(id);
    }
    public static async getUntargettedBanners(bannerOrientation: number): Promise<Banner[]> {
        const format = 'YYYY-MM-DD HH:mm:ss'
        return await getManager().query(
            `select distinct banner.*  FROM banner
                JOIN campaign ON campaign.id = banner.campaignsId
                JOIN campaign_profiles_profile ON campaign_profiles_profile.campaignId = campaign.id
                where banner.type = ${bannerOrientation}
                    and campaign.endDate > '${moment(new Date()).endOf('day').format(format)}'
                    and campaign.startDate < '${moment(new Date()).startOf('day').format(format)}';`
        ) as Banner[]
    }
}