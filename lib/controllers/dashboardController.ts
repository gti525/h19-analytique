import { Request, Response } from 'express';

export class dashboardController {

    public async index(req: Request, res: Response) {
        res.render('index');
    }
}