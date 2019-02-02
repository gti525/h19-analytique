import { Request, Response } from 'express';
import { StatistiqueService } from '../service/statistique.service';
import { Statistique } from '../DB/entity/statistique.entitiy';
import { WebsiteurlService } from '../service/websiteurl.service';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { AdvancedConsoleLogger } from 'typeorm';

export class StatistiqueController {
    private statistiqueService: StatistiqueService = new StatistiqueService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async index(req: Request, res: Response) {
        const statistiques = await this.statistiqueService.getStatistiquesById(req.params.id);
        res.render('statistique/index', { statistiques: statistiques });
    }

}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.