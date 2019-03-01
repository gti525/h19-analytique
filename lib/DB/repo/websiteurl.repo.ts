import {getRepository, In, IsNull,Not} from "typeorm";
import { WebSiteUrl } from "../entity/websiteurl.entity";
export class WebsiteurlRepo {

    public static async findById(id:number): Promise<WebSiteUrl>{
        const websiteurlRepo = getRepository(WebSiteUrl);
        return await websiteurlRepo.findOne(id, { relations: ["profile"] });
    }
    public static async find(tagettedUrls: string[]): Promise<WebSiteUrl[]>{
        const websiteurlRepo = getRepository(WebSiteUrl);
        return await websiteurlRepo.find({where: {url: In(tagettedUrls)},relations: ["profile"]});
    }
    public static async createOrUpdate(profile: WebSiteUrl): Promise<WebSiteUrl>{
        const websiteurlRepo = getRepository(WebSiteUrl);
        return await websiteurlRepo.save(profile);
    }
}