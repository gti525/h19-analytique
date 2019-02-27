import { Request, Response } from 'express';
import { BaseController } from './baseController';

export class DashboardController extends BaseController{

    public async index(req: Request, res: Response) {
        await this.sendResponse(req,res,'index',{})
    }
}