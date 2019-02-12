import {getRepository} from "typeorm";
import {Banner} from "../entity/banner.entity";
export class BannerRepo {

    public static async findById(id:number): Promise<Banner>{
        const bannerRepo = getRepository(Banner);
        return await bannerRepo.findOne(id);
    }
}