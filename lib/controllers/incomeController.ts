import { Request, Response } from 'express';
import { IncomeService } from "../service/income.service";
import { IncomeChart } from "../models/enums/incomechart-enum"
export class IncomeController {

    private incomeService: IncomeService = new IncomeService();

    public async index(req: Request, res: Response) {
        // TODO trouver le id du user actuel
        const userId = 10;
        // TODO si income n'existe pas, retourner la page 404
        const income = await this.incomeService.getIncomeByUserId(userId);

        res.render('income/index', {income: income,incomeChart : IncomeChart});
    }


}