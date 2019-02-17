import { WebSiteUrl } from "../DB/entity/websiteurl.entity";
import { WebsiteurlRepo } from "../DB/repo/websiteurl.repo";
import * as _ from 'lodash'

export class WebsiteurlService {
    public async addWebsiteurl(url: WebSiteUrl): Promise<WebSiteUrl> {
        return await WebsiteurlRepo.createOrUpdate(url);
    }

    public async updateWebsiteurl(url: WebSiteUrl): Promise<WebSiteUrl> {
        return await WebsiteurlRepo.createOrUpdate(url);
    }

    public async findProfilesByUrl(filter: any): Promise<WebSiteUrl[]> {
        return await WebsiteurlRepo.find(filter);
    }

    public async deleteWebsiteurl(id: number){
        await WebsiteurlRepo.delete(id);
    }
    public isWebsiteurlValid(websiteurl: any): boolean{
        return !_.isEmpty(websiteurl.url);
    }
}