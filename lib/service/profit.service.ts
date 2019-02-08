import { Profit } from "../DB/entity/profit.entitiy";
import { MoneyRepo } from "../DB/repo/profit.repo";

export class MoneyService {


    public async getProfitByUserId(userId: number): Promise<Profit> {
        // NOT IMPLEMENTED YET
        console.log("NOT IMPLEMENTED YET");
        const profit = new Profit()
        profit.regularClicks  = Math.floor(Math.random()* 100)+20;
        profit.regularViews  = Math.floor(Math.random()* 100)+20;
        profit.targetedClicks  = Math.floor(Math.random()* 100)+20;
        profit.targetedViews  = Math.floor(Math.random()* 100)+20;

        profit.cashedRegularClicks  = Math.floor(Math.random()* 20);
        profit.cashedRegularViews  = Math.floor(Math.random()* 20);
        profit.cashedTargetedClicks  = Math.floor(Math.random()* 20);
        profit.cashedTargetedViews  = Math.floor(Math.random()* 20);
        
        return profit;
    }

}