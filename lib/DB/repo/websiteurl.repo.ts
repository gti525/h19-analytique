import {getRepository} from "typeorm";
import { WebSiteUrl } from "../entity/websiteurl.entity";
export class WebsiteurlRepo {

    public static async findById(id:number): Promise<WebSiteUrl>{
        const websiteurlRepo = getRepository(WebSiteUrl);
        return await websiteurlRepo.findOne(id, { relations: ["profiles"] });
    }
    public static async find(filter: any): Promise<WebSiteUrl[]>{
        const websiteurlRepo = getRepository(WebSiteUrl);
        return await websiteurlRepo.find({where: filter,relations: ["profiles"]});
    }
    public static async createOrUpdate(profile: WebSiteUrl): Promise<WebSiteUrl>{
        const websiteurlRepo = getRepository(WebSiteUrl);
        return await websiteurlRepo.save(profile);
    }
    public static async delete(id: number){
        const websiteurlRepo = getRepository(getRepository);
        const urlToDelete  = await WebsiteurlRepo.findById(id);
        if (urlToDelete)
            await websiteurlRepo.delete(urlToDelete);
    }
}