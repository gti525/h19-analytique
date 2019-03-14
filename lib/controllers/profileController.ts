import { Request, Response } from 'express';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../DB/entity/profile.entitiy';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { BaseController } from './baseController';
import {check , validationResult} from "express-validator/check";
import {BannerType} from "../DB/entity/campaign.entity";
import {In} from "typeorm";

export class ProfileController extends BaseController {
    private profileService: ProfileService = new ProfileService();



    public async index(req: Request, res: Response) {
        this.generateIndexPage(req,res)
    }

    public async create(req: Request, res: Response, next) {
        let result;
        if (req.method !== 'GET' && req.method !== 'POST') {
            result= next();
        }
        let content: {[k: string]: any} = {};
        content.profiles = await this.profileService.getProfilesByUser(await this.getUser(req));

        if (req.method == 'POST') {
            const vResult = validationResult(req);
            if (vResult.isEmpty()) {
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
                    result = res.redirect("/profile")

                } catch (error) {
                    content.errors = [error];
                }
            } else {
                content.errors = this.formatErrors(vResult.array());
            }
        }
        return result || await this.sendResponse(req,res,"profile/create", content);
    }


    public async edit(req: Request, res: Response) {
        let content: {[k: string]: any} = {};
        content.profile = await this.profileService.getProfileById(req.params.id);

        if (req.method == 'POST'){
            const vResult = validationResult(req);
            if (vResult.isEmpty()) {
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
                        res.redirect("/profile")
                    }
                }
                catch (error) {
                    content.errors = [error];
                }
            } else{
                content.errors = this.formatErrors(vResult.array());
            }
        }
        return await this.sendResponse(req,res,'profile/edit', content);
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
            await this.generateIndexPage(req, res, error);
        }
    }

    private async generateIndexPage(req: Request, res: Response, errors: any = {}) {
        const profiles = await this.profileService.getProfilesByUser(await this.getUser(req));
        await this.sendResponse(req, res, 'profile/index', { profiles, errors });
    }

    validate = () => {
        return [
            check("identifier", "l'identifiant est requis.").not().isEmpty(),
            check('identifier', 'L"identifiant doit ètre composé de 3 caractères minimum.').isLength({min:3}),
            check("type", "Le type est réquis.").not().isEmpty(),
            check("type", "Le type doit être composé de 3 caractères minimum").isLength({min:3}),
            check("urls", "Le url est requis.").not().isEmpty(),
            check("urls", "Le url entré n'est pas valide.").isURL()
        ]
    }
}