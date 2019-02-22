import { Income } from "../DB/entity/income.entitiy";
import { UserService } from "./user.service";
import { User } from "../DB/entity/user.entitiy";
import * as _ from 'lodash'
import { ClientStatisticsService } from "./clientStatistics.service";

export class IncomeService {
    private clientStatisticService: ClientStatisticsService = new ClientStatisticsService();

    public async getIncome(user: User): Promise<Income> {
        console.log(user);
        const income = new Income();
        _.merge(income,user.income);
        income.regularClicks = await this.clientStatisticService.countBannersClicked(user,false);
        income.regularViews = await this.clientStatisticService.countBannersViewed(user,false);
        income.targetedClicks = await this.clientStatisticService.countBannersClicked(user,true);
        income.targetedViews = await this.clientStatisticService.countBannersViewed(user,true);
        return income;
    }


}