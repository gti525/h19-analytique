import {getRepository} from "typeorm";
import { ClientStatistic } from "../entity/clientStats";
import { Banner } from "../entity/banner.entity";
import { Client } from "../entity/client.entity";
import { User } from "../entity/user.entitiy";
import * as moment from 'moment';
export class ClientStatisticRepo {
    public static async findById(clientStatisticId: number): Promise<ClientStatistic> {
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.findOne(clientStatisticId);
    }

    public static async clientSawBanner(banner:Banner,client: Client): Promise<boolean> {
        const clientStatisticRepo = getRepository(ClientStatistic);
        return (await clientStatisticRepo.count({where:{banner,client}}))> 0;
    }

    public static async countBannersViewed(user:User,isTargeted:boolean): Promise<number>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.count({where:{user,isView: true,isTargeted}});
    }
    public static async countBannersClicked(user:User,isTargeted:boolean): Promise<number>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.count({where:{user,isClick: true,isTargeted}});
    }

    public static async countLastMinuteEntry(client:Client,user:User): Promise<number>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        const format = 'YYYY-MM-DD HH:mm:ss'
        return await clientStatisticRepo.createQueryBuilder()
        .where(`date > '${moment().subtract(1,'minute').format(format)}'`)
        .andWhere(`clientId = ${client.id}`)
        .andWhere(`userId = ${user.id}`)
        .getCount();
    }
    public static async save(clientStatistic:ClientStatistic): Promise<ClientStatistic>{
        const clientStatisticRepo = getRepository(ClientStatistic);
        return await clientStatisticRepo.save(clientStatistic);
    }
}
