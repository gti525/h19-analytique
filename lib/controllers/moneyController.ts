import { Request, Response } from 'express';

export class MoneyController {

    public async index(req: Request, res: Response) {
        res.render('money/pub');
    }
}