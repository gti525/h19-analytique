import { Request, Response } from 'express';
import {Money} from "../DB/entity/money.entitiy";
import {MoneyService} from "../service/money.service";

export class MoneyController {

    private moneyService: MoneyService = new MoneyService();

    public async index(req: Request, res: Response) {

        const money = new Money()
        money.regulier = "test1"
        money.cible    = "test2"
        money.vue      =100
        money.cliquer   = 100

        console.log(money)
        res.render('money/pub');
    }


}