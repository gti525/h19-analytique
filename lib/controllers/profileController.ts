import { Request, Response } from 'express';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../DB/entity/profile.entitiy';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { BaseController } from './baseController';
import { Check } from "typeorm";

export class ProfileController extends BaseController {
    private profileService: ProfileService = new ProfileService();

    public async index(req: Request, res: Response) {
        const profiles = await this.profileService.getProfilesByUser(await this.getUser(req));
        await this.sendResponse(req,res,'profile/index',{ profiles })
    }

    public async create(req: Request, res: Response, next) {
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        if (req.method == 'GET'){
            await this.sendResponse(req,res,'profile/create')
        }else {
            try {
                const urls = [];
                req.body.urls.forEach(function (url) {
                    const websiteUrl = new WebSiteUrl();
                    websiteUrl.url = url;
                    urls.push(websiteUrl);
                });

                const profile = new Profile();
                profile.identifier = req.body.identifier;
                profile.type = req.body.type;
                profile.urls = urls;
                profile.user = await this.getUser(req);

                await this.profileService.addProfile(profile);
                res.redirect("/profile")
            }
            catch (error) {
                return res.json(error).status(500);
            }
        }
    }

    public async validateChamps(req: Request, res: Response, next) {
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        if (req.method == 'POST'){

            const identifier = req.body.identifier;
            const type       = req.body.type;
            const urls       = req.body.urls; 


            req.checkBody('name').notEmpty().withMessage('Name field is required');
            
    }
}

    public async edit(req: Request, res: Response, next) {
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        if (req.method == 'GET'){
            try {
                let profile: any;
                if (req.params.id) {
                    profile = await this.profileService.getProfileById(req.params.id);
                }
                await this.sendResponse(req,res,'profile/edit',{ profile: profile })
            }
            catch (error) {
                return res.json(error).status(500);
            }
        }else {
            try {
                const profile = await this.profileService.getProfileById(req.body.id);
                if (profile) {

                    const urls = [];
                    req.body.urls.forEach(function (url) {
                        const websiteUrl = new WebSiteUrl();
                        websiteUrl.url = url;
                        urls.push(websiteUrl);
                    });

                    profile.identifier = req.body.identifier;
                    profile.type = req.body.type;
                    profile.urls = urls;

                    await this.profileService.updateProfile(profile);
                    await this.sendResponse(req,res,'profile/edit', { profile: profile })
                }
            }
            catch (error) {
                return res.json(error).status(500);
            }
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