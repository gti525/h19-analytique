import { Request, Response } from 'express';
import {CampaignService} from "../service/campaign.service";
import {Campaign, BannerType} from "../DB/entity/campaign.entity";
import {EnumsToArray} from "../helpers/enumsToArray";
import {Banner} from "../DB/entity/banner.entity";
import {ProfileService} from "../service/profile.service";
import {In} from "typeorm";
import { BaseController } from './baseController';
import {check, validationResult} from "express-validator/check";

export class CampaignController extends BaseController{

    private campaignService: CampaignService = new CampaignService();
    private profileService: ProfileService = new ProfileService();
    private enumsToArray: EnumsToArray = new EnumsToArray();

    public async index(req: Request, res: Response) {
        const campaigns = await this.campaignService.getCampaignByUser(await this.getUser(req));
        await this.sendResponse(req, res,'campaign/index', { campaigns, moment: require("moment") });
    }

    public async create(req: Request, res: Response, next){
        let result;
        if (req.method !== 'GET' && req.method !== 'POST') {
            result = next()
        }

        let content: {[k: string]: any} = {};
        content.campaignTypes = await this.enumsToArray.translateEnumToSelectArray(BannerType);
        content.profiles = await this.profileService.getProfilesByUser(await this.getUser(req));

        if (req.method == 'POST'){
            const vResult = validationResult(req);
            if(vResult.isEmpty()){
                try {
                    const banners = [];
                    req.body.banners.forEach(function(e){
                        const banner = new Banner();
                        banner.url = e.url;
                        banner.image = e.image;
                        banner.type = e.type;
                        banners.push(banner);
                    });

                    const profileIds = req.body.profileIds.map(function(value) {
                        return parseInt(value, 10);
                    });
                    const profiles = await this.profileService.getProfiles({id: In(profileIds)});

                    const campaign = new Campaign();
                    campaign.startDate = req.body.startDate;
                    campaign.endDate = req.body.endDate;
                    campaign.banners = banners;
                    campaign.profiles = profiles;
                    campaign.user = await this.getUser(req);
                    await this.campaignService.addCampaign(campaign);

                    result = res.redirect("/campaign");
                }
                catch (error) {
                    content.errors = [error];
                }
            }else{
                content.errors = this.formatErrors(vResult.array());
            }
        }
        return result || await this.sendResponse(req,res,'campaign/create', content);
    }

    public async edit(req: Request, res: Response, next){
        let result;
        if (req.method !== 'GET' && req.method !== 'POST') {
            result = next()
        }

        let content: {[k: string]: any} = {};
        content.campaignTypes = await this.enumsToArray.translateEnumToSelectArray(BannerType);
        content.profiles = await this.profileService.getProfilesByUser(await this.getUser(req));
        content.campaign = await this.campaignService.getCampaignById(req.params.id);
        content.moment = require("moment");

        if (req.method == 'POST'){
            const vResult = validationResult(req);
            if(vResult.isEmpty()) {
                try {
                    const campaign = await this.campaignService.getCampaignById(req.body.id);
                    campaign.startDate = req.body.startDate;
                    campaign.endDate = req.body.endDate;

                    campaign.banners.forEach(function (banner) {
                        const newBanner = req.body.banners.filter(function (b) {
                            return b.id == banner.id
                        })[0];
                        banner.url = newBanner.url;
                        banner.image = newBanner.image;
                    });

                    const profileIds = req.body.profileIds.map(function (value) {
                        return parseInt(value, 10);
                    });
                    campaign.profiles = await this.profileService.getProfiles({id: In(profileIds)});

                    await this.campaignService.updateCampaign(campaign);

                    result = res.redirect("/campaign");
                }
                catch (error) {
                    content.errors = [error];
                }
            }else{
                content.errors = this.formatErrors(vResult.array());
            }
        }
        return result || await this.sendResponse(req, res,'campaign/edit', content);
    }

    public async delete(req: Request, res: Response){
        let result;
        try {
            if (req.params.id) {
                await this.campaignService.deleteCampaign(req.params.id);
                result = res.redirect("/campaign");
            }
        }
        catch (error) {
            result = await this.sendResponse(req, res,'/campaign', { errors: [error] });
        }
        return result;
    }

    validate = () => {
        return [
            check("startDate", "La date de début est requise.").not().isEmpty(),
            check("endDate", "La date de fin est requise.").not().isEmpty(),
            check('banners.*.url', "Le url est requis.").not().isEmpty(),
            check('banners.*.image', "L'image publicitaire est requise.").not().isEmpty()
        ]
    }
}