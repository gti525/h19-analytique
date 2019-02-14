import { BannerRepo } from "../DB/repo/banner.repo";
import {Banner} from "../DB/entity/banner.entity";

export class BannerService {
    public async findById(id) : Promise<Banner> {
        return id? await BannerRepo.findById(id) : undefined;
    }
}