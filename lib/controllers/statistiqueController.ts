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
            await this.sendResponse(req,res,'statistique',{ os: clients, resolutions: clients, pays: clients })
        }
        catch (error) {
            console.log(error)
            return res.send(error).status(500);
        }
    }



}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.