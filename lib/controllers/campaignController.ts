import { Request, Response } from 'express';
import {CampaignService} from "../service/campaign.service";
import {Campaign, BannerType} from "../DB/entity/campaign.entity";
import {EnumsToArray} from "../helpers/enumsToArray";
import {Banner} from "../DB/entity/banner.entity";
import {ProfileService} from "../service/profile.service";
import {In} from "typeorm";
import { BaseController } from './baseController';
import {validationResult} from "express-validator/check";

export class CampaignController extends BaseController{

    private campaignService: CampaignService = new CampaignService();
    private profileService: ProfileService = new ProfileService();
    private enumsToArray: EnumsToArray = new EnumsToArray();
    public async index(req: Request, res: Response) {
        const campaigns = await this.campaignService.getCampaignByUser(await this.getUser(req));
        res.render('campaign/index', { campaigns, moment: require("moment") });
    }

    public async create(req: Request, res: Response, next){
        let result;
        if (req.method !== 'GET' && req.method !== 'POST') {
            result = next()
        }
        if (req.method == 'GET'){
            let campaignTypes = await this.enumsToArray.translateEnumToSelectArray(BannerType);
            let profiles = await this.profileService.getProfilesByUser(await this.getUser(req));
            result = await this.sendResponse(req,res,'campaign/create',{ campaignTypes, profiles: profiles })
        }else{
            const errors = validationResult(req);
            if(errors.isEmpty()){
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
                    result = res.json(error).status(500);
                }
            }else{
                result = res.status(401).json({ errors: errors.array() });
            }
        }
        return result;
    }

    public async edit(req: Request, res: Response, next){
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        if (req.method == 'GET'){
            let campaign: any;
            let profiles: any;
            let campaignTypes: any;
            if (req.params.id) {
                campaignTypes = await this.enumsToArray.translateEnumToSelectArray(BannerType);
                profiles = await this.profileService.getProfilesByUser(await this.getUser(req));
                campaign = await this.campaignService.getCampaignById(req.params.id);
            }
            res.render('campaign/edit', { campaign: campaign, profiles: profiles, campaignTypes: campaignTypes, moment: require("moment") });
        }else{
            try {
                const campaign = await this.campaignService.getCampaignById(req.body.id);
                campaign.startDate = req.body.startDate;
                campaign.endDate = req.body.endDate;

                campaign.banners.forEach(function(banner) {
                    const newBanner = req.body.banners.filter(function(b){ return b.id == banner.id })[0];
                    banner.url = newBanner.url;
                    banner.image = newBanner.image;
                });

                const profileIds = req.body.profileIds.map(function(value) {
                    return parseInt(value, 10);
                });
                campaign.profiles = await this.profileService.getProfiles({id: In(profileIds)});

                await this.campaignService.updateCampaign(campaign);

                res.redirect("/campaign");
            }
            catch (error) {
                return res.json(error).status(500);
            }
        }
    }

    public async delete(req: Request, res: Response){
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