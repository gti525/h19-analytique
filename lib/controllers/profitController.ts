import { Request, Response } from 'express';
import {MoneyService as ProfitService} from "../service/profit.service";
import { ProfitChart } from "../models/enums/profitchart-enum"
export class ProfitController {

    private profitService: ProfitService = new ProfitService();

    public async index(req: Request, res: Response) {
        // TODO trouver le id du user actuel
        const userId = 10;
        // TODO si profit n'existe pas, retourner la page 404
        const profit = await this.profitService.getProfitByUserId(userId);

        res.render('profit/index', {profit,profitChart : ProfitChart});
    }


}