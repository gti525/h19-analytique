import { Request, Response } from 'express';
import { CampaignService } from '../service/campaign.service';
import { Campain } from '../DB/entity/campain.entitiy';
import { WebsiteurlService } from '../service/websiteurl.service';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { AdvancedConsoleLogger } from 'typeorm';

export class ProfileController {
    private profileService: ProfileService = new ProfileService();
    private websiteurlService: WebsiteurlService = new WebsiteurlService();

    public async index(req: Request, res: Response) {
        const profiles = await this.profileService.getProfiles();
        console.log(profiles);
        res.render('profile/index', { profiles: profiles });
    }

    public async create(req: Request, res: Response, next) {
        try {
            const profile = new Profile();
            profile.name = req.body.name;
            profile.url = req.body.url;

            if (profile) {
                await this.profileService.addProfile(profile);
                res.redirect("/profile")
            }
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async getCreateProfilePage(req: Request, res: Response, next) {
        res.render('profile/create');
    }

    public async getProfilePage(req: Request, res: Response, next) {
        try {
            let profile: any;
            if (req.params.id) {
                profile = await this.profileService.getProfileById(req.params.id);
            }

            res.render('profile/edit', { profile: profile });
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async edit(req: Request, res: Response, next) {
        try {
            console.log("id " + req.body.id);
            const profile = await this.profileService.getProfileById(req.body.id);
            if (profile) {
                profile.name = req.body.name;
                profile.url = req.body.url;
                await this.profileService.updateProfile(profile);
                res.render("profile/edit", { profile: profile });
            }
        }
        catch (error) {
            return res.json(error).status(500);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            if (req.params.id) {
                await this.profileService.deleteProfile(req.params.id);
                res.redirect("/profile");
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