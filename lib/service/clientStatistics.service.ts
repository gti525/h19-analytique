import { ClientStatistic } from "../DB/entity/clientStats"
import { ClientStatisticRepo } from "../DB/repo/stats.repo";
import { User } from "../DB/entity/user.entitiy";
import { CampaignService } from "./campaign.service";

export class ClientStatisticsService {
    public async setClick(clientStatisticId: number) {
        const clientStatistic =  await ClientStatisticRepo.findById(clientStatisticId);
        clientStatistic.isView = false;
        clientStatistic.isClick = true;
        clientStatistic.date = new Date();
        this.save(clientStatistic);
    }
    private campaignService = new CampaignService();
    public async save(clientStatistics: ClientStatistic) : Promise<ClientStatistic> {
        return await ClientStatisticRepo.save(clientStatistics);
    }
    public async countBannersClicked(user:User,targeted: boolean): Promise<number>{
        let total = 0;
        for(const c of user.campaigns){
            const campaign = await this.campaignService.getCampaignById(c.id);
            for (const b of campaign.banners){
                total +=  await ClientStatisticRepo.countBannersClicked(b,targeted);
            }
        }
        return total;
    }
    public async countBannersViewed(user:User,targeted: boolean): Promise<number>{
        let total = 0;
        for(const c of user.campaigns){
            const campaign = await this.campaignService.getCampaignById(c.id);
            for (const b of campaign.banners){
                total +=  await ClientStatisticRepo.countBannersViewed(b,targeted);
            }
        }
        return total;
    }
}