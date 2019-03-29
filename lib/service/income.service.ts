import { Income } from "../DB/entity/income.entitiy";
import { IncomeRepo } from "../DB/repo/income.repo";
import { User } from "../DB/entity/user.entitiy";
import * as _ from 'lodash'
import { ClientStatisticsService } from "./clientStatistics.service";
import { IncomeChart } from "../models/enums/incomechart-enum";

export class IncomeService {
    private clientStatisticService: ClientStatisticsService = new ClientStatisticsService();

    public async getIncome(user: User): Promise<Income> {
        const income = new Income();
        _.merge(income,user.income);
        income.regularClicks = await this.clientStatisticService.countBannersClicked(user,false);
        income.regularViews = await this.clientStatisticService.countBannersViewed(user,false);
        income.targetedClicks = await this.clientStatisticService.countBannersClicked(user,true);
        income.targetedViews = await this.clientStatisticService.countBannersViewed(user,true);
        return income;
    }

    public async cashIncome(income: Income): Promise<Income> {
        income.cashedRegularClicks = income.regularClicks;
        income.cashedRegularViews = income.regularViews;
        income.cashedTargetedClicks = income.targetedClicks;
        income.cashedTargetedViews = income.targetedViews;
        return await IncomeRepo.createOrUpdate(income);
    }

    public calculateProfits(income: Income){
        return  (income.regularClicks-income.cashedRegularClicks)*IncomeChart.regularClick+
                (income.targetedClicks-income.cashedTargetedClicks)*IncomeChart.targetedClick+
                (income.regularViews-income.cashedRegularViews)*IncomeChart.regularView+
                (income.targetedViews-income.cashedTargetedViews)*IncomeChart.targetedView
    }

}