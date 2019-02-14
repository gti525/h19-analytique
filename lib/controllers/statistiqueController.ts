import { Request, Response } from 'express';
import { StatistiqueService } from '../service/statistique.service';
import { WebsiteurlService } from '../service/websiteurl.service';

export class StatistiqueController {
    private statistiqueService: StatistiqueService = new StatistiqueService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async index(req: Request, res: Response, next) {
        req.params.id = 1; // à changé une fois les liens BDD ok
        try {
            let os, resolutions, pays: any;
            if (req.params.id) {
                os = await this.statistiqueService.getOSBySiteWebId(req.params.id);
                resolutions = await this.statistiqueService.getResolutionBySiteWebId(req.params.id);
                pays = await this.statistiqueService.getPaysBySiteWebId(req.params.id);
            }

            res.render('statistique', { os: os, resolutions: resolutions, pays: pays });
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }



}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.