import { Request, Response } from 'express';
import {CampaignService} from "../service/campaign.service";
import {Campaign, CampaignTypes} from "../DB/entity/campaign.entity";
import {EnumsToArray} from "../helpers/enumsToArray";
import {Banner} from "../DB/entity/banner.entity";
import {ProfileService} from "../service/profile.service";
import {In} from "typeorm";

export class CampaignController {

    private campaignService: CampaignService = new CampaignService();
    private profileService: ProfileService = new ProfileService();
    private enumsToArray: EnumsToArray = new EnumsToArray();

    public async index(req: Request, res: Response) {
        const campaigns = await this.campaignService.getCampaigns();
        res.render('campaign/index', { campaigns, moment: require('moment') });
    }

    public async create(req: Request, res: Response, next){
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        if (req.method == 'GET'){
            let campaignTypes = await this.enumsToArray.translateEnumToSelectArray(CampaignTypes);
            let profiles = await this.profileService.getProfiles();
            res.render('campaign/create', { campaignTypes, uuidv4 : require('uuid/v4'), profiles: profiles });
        }else{
            try {
                const banners = [];
                req.body.banners.forEach(function(element){
                    const banner = new Banner();
                    banner.type = element.type;
                    banner.image = element.image;
                    banner.url = element.url;
                    banners.push(banner);
                });

                const profileIds = req.body.profiles.map(function(value) {
                    return parseInt(value, 10);
                });
                const profiles = await this.profileService.getProfiles({id: In(profileIds)});

                const campaign = new Campaign();
                campaign.startDate = req.body.startDate;
                campaign.endDate = req.body.endDate;
                campaign.banners = banners;
                campaign.profiles = profiles;
                this.campaignService.addCampaign(campaign);

                res.redirect("/campaign")
            }
            catch (error) {
                return res.json(error).status(500);
            }
        }
    }

    public async edit(req: Request, res: Response, next){
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        if (req.method == 'GET'){
            let campaign: any;
            if (req.params.id) {
                campaign = await this.campaignService.getCampaignById(req.params.id);
            }
            res.render('campaign/edit', { campaign: campaign });
        }else{
            try {
                res.redirect("/campaign")
            }
            catch (error) {
                return res.json(error).status(500);
            }
        }
    }

    public async delete(req: Request, res: Response){

    }
}