import { Request, Response } from 'express';
import { IncomeService } from "../service/income.service";
import { IncomeChart } from "../models/enums/incomechart-enum"
import { BaseController } from './baseController';
export class IncomeController extends BaseController{

    private incomeService: IncomeService = new IncomeService();

    public async index(req: Request, res: Response) {
        const user = await this.getUser(req);
        const income = await this.incomeService.getIncome(user);
        this.sendResponse(req,res,'income/index',{income,incomeChart : IncomeChart})
    }


}