import { Income } from "../DB/entity/income.entitiy";

export class IncomeService {


    public async getIncomeByUserId(userId: number): Promise<Income> {
        // NOT IMPLEMENTED YET
        console.log("NOT IMPLEMENTED YET");
        const income = new Income()
        income.regularClicks  = Math.floor(Math.random()* 100)+20;
        income.regularViews  = Math.floor(Math.random()* 100)+20;
        income.targetedClicks  = Math.floor(Math.random()* 100)+20;
        income.targetedViews  = Math.floor(Math.random()* 100)+20;

        income.cashedRegularClicks  = Math.floor(Math.random()* 20);
        income.cashedRegularViews  = Math.floor(Math.random()* 20);
        income.cashedTargetedClicks  = Math.floor(Math.random()* 20);
        income.cashedTargetedViews  = Math.floor(Math.random()* 20);
        
        return income;
    }

}