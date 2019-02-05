import { Request, Response } from 'express';
import { CampaignService } from '../service/campaign.service';
import { Campaign } from '../DB/entity/campaign.entitiy';
import { WebsiteurlService } from '../service/websiteurl.service';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { AdvancedConsoleLogger } from 'typeorm';

export class CampaignController {
    private campaignService: CampaignService = new CampaignService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async index(req: Request, res: Response) {
        const campaigns = await this.campaignService.getCampaigns();
        console.log(campaigns);
        res.render('campaign/index', { campaigns: campaigns });
    }

    public async create(req: Request, res: Response, next) {
        try {
            const campaign = new Campaign();
            campaign.name = req.body.name;
            campaign.url = req.body.url;

            if (campaign) {
                await this.campaignService.addCampaign(campaign);
                res.redirect("/campaign")
            }
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async getCreateCampaignPage(req: Request, res: Response, next) {
        res.render('campaign/create');
    }

    public async getCampaignPage(req: Request, res: Response, next) {
        try {
            let campaign: any;
            if (req.params.id) {
                campaign = await this.campaignService.getCampaignById(req.params.id);
            }

            res.render('campaign/edit', { campaign: campaign });
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async edit(req: Request, res: Response, next) {
        try {
            console.log("id " + req.body.id);
            const campaign = await this.campaignService.getCampaignById(req.params.id);
            if (campaign) {
                campaign.name = req.body.name;
                campaign.url = req.body.url;
                await this.campaignService.updateCampaign(campaign);
                res.render("campaign/edit", { campaign: campaign });
            }
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            if (req.params.id) {
                await this.campaignService.deleteCampaign(req.params.id);
                res.redirect("/campaign");
            }
            else {
                res.status(400).json(`no id was provided`);
            }
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }
}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.