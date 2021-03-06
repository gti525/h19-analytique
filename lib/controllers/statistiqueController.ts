import { Request, Response } from 'express';
import { StatistiqueService } from '../service/statistique.service';
import { WebsiteurlService } from '../service/websiteurl.service';
import { BaseController } from './baseController';

export class StatistiqueController  extends BaseController{
    private statistiqueService: StatistiqueService = new StatistiqueService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async index(req: Request, res: Response, next) {
        try {
            const clients = await this.statistiqueService.getClients(await this.getUser(req));
            await this.sendResponse(req,res,'statistique',{ clients })
        }
        catch (error) {
            return res.send(error).status(500);
        }
    }



}
