import { Request, Response } from 'express';
import { StatistiqueService } from '../service/statistique.service';
import { Statistique } from '../DB/entity/statistique.entitiy';
import { WebsiteurlService } from '../service/websiteurl.service';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { AdvancedConsoleLogger } from 'typeorm';

export class StatistiqueController {
    private statistiqueService: StatistiqueService = new StatistiqueService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async getStatistiquePage(req: Request, res: Response, next) {
        try {
            let statistiques: any;
            if (req.params.id) {
                statistiques = await this.statistiqueService.getStatistiquesById(req.params.id);
            }

            res.render('statistique', { statistiques: statistiques });
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async index(req: Request, res: Response) {
        const statistiques = await this.statistiqueService.getStatistiques();
        var a = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4].reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1;
            } else {
              acc[curr] += 1;
            }
          
            return acc;
          }, {});
        res.render('statistique/index', { statistiques: statistiques });
    }




}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.