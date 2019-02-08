import { Request, Response } from 'express';
import {Money} from "../DB/entity/money.entitiy";
import {MoneyService} from "../service/money.service";

export class MoneyController {

    private moneyService: MoneyService = new MoneyService();

    public async index(req: Request, res: Response) {

        const ClientRegulier = new Money()
        ClientRegulier.regulier = "Client Regulier"
        ClientRegulier.vue      =100
        ClientRegulier.cliquer   = 100

        console.log(ClientRegulier)

        const ClientCible = new Money()
        ClientRegulier.regulier = "Client Cible"
        ClientRegulier.vue      =50
        ClientRegulier.cliquer   = 50

        console.log(ClientCible )
        res.render('money/pub');
    }


}