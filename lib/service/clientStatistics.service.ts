import { ClientStatistic } from "../DB/entity/clientStats"
import { ClientStatisticRepo } from "../DB/repo/stats.repo";
import { User } from "../DB/entity/user.entitiy";

export class ClientStatisticsService {
    public async setClick(clientStatisticId: number) {
        console.log('setting click');
        if(clientStatisticId === -1)
            throw new Error("client statistic was missing, spamming a bit too much?")
        const clientStatistic =  await ClientStatisticRepo.findById(clientStatisticId);
        console.log(clientStatistic,'stat');
        if (clientStatistic){
            clientStatistic.isView = false;
            clientStatistic.isClick = true;
            clientStatistic.date = new Date();
            await this.save(clientStatistic);
        }
    }
    public async save(clientStatistics: ClientStatistic) : Promise<ClientStatistic> {
        return await ClientStatisticRepo.save(clientStatistics);
    }
    public async countBannersClicked(user:User,targeted: boolean): Promise<number>{
        return  await ClientStatisticRepo.countBannersClicked(user,targeted);
    }
    public async countBannersViewed(user:User,targeted: boolean): Promise<number>{
        return  await ClientStatisticRepo.countBannersViewed(user,targeted);
    }
}