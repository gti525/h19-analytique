import { Request, Response } from 'express';

export class DashboardController {

    public async index(req: Request, res: Response) {
        res.render('index');
    }
}