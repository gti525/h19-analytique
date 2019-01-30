import { Request, Response } from 'express';

export class MontantController {

    public async index(req: Request, res: Response) {
        res.render('montant/argent');
    }
}