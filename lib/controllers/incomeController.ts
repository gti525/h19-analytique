import { Request, Response } from 'express';
import { IncomeService } from "../service/income.service";
import { IncomeChart } from "../models/enums/incomechart-enum"
import { BaseController } from './baseController';
export class IncomeController extends BaseController{

    private incomeService: IncomeService = new IncomeService();

    public async index(req: Request, res: Response) {
        // TODO trouver le id du user actuel
        // TODO si income n'existe pas, retourner la page 404
        const user = await this.getUser(req.session.id);
        res.render('income/index', {income: user.income,incomeChart : IncomeChart});
    }


}