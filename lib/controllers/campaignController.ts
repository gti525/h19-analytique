import { Request, Response } from 'express';
import { Campaign } from '../DB/entity/campaign.entitiy';
import { CampaignService } from '../service/campaign.service';
import { ProfileService } from '../service/profile.service';

export class CampaignController {
    private campaignService: CampaignService = new CampaignService();
    private profileService: ProfileService = new ProfileService();

    public async index(req: Request, res: Response) {
        const campaigns = await this.campaignService.getCampaigns();
        res.render('campaign/index', { campaigns });
    }

    public async create(req: Request, res: Response, next) {
        try {
            const campaign = new Campaign();
            campaign.name = req.body.name;
            const profile = await this.profileService.getProfileById(req.body.profile);
            if (campaign && profile) {
                campaign.profile = profile;
                await this.campaignService.addCampaign(campaign);
                res.redirect("/campaign")
            }
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async getCreateCampaignPage(req: Request, res: Response, next) {
        // TODO aller chercher les profiles de l'usager en cours.
        const profiles = await this.profileService.getProfiles();
        res.render('campaign/create',{profiles});
    }

    public async getEditCampaignPage(req: Request, res: Response, next) {
        try {
            let campaign: any;
            if (req.params.id) {
                campaign = await this.campaignService.getCampaignById(req.params.id);
            }
            
            const profiles = await this.profileService.getProfiles();
            res.render('campaign/edit', { campaign: campaign,profiles });
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async edit(req: Request, res: Response, next) {
        try {
            const campaign = await this.campaignService.getCampaignById(req.params.id);
            const profile = await this.profileService.getProfileById(req.body.profile);
            if (campaign && profile) {
                campaign.name = req.body.name;
                campaign.profile = profile;
                await this.campaignService.updateCampaign(campaign);
                const profiles = await this.profileService.getProfiles();
                res.render("campaign/edit", { campaign, profiles});
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
