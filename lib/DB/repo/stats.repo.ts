import {getRepository} from "typeorm";
import { ClientStatistic } from "../entity/clientStats";
import { Banner } from "../entity/banner.entity";
export class ClientStatisticRepo {
    public static async findById(clientStatisticId: number): Promise<ClientStatistic> {
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.findOne(clientStatisticId);
    }

    public static async countBannersViewed(banner:Banner,isTargeted:boolean): Promise<number>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.count({where:{banner,isView: true,isTargeted}});
    }
    public static async countBannersClicked(banner:Banner,isTargeted:boolean): Promise<number>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.count({where:{banner: banner,isClick: true,isTargeted}});
    }
    public static async save(clientStatistic:ClientStatistic): Promise<ClientStatistic>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.save(clientStatistic);
    }
}