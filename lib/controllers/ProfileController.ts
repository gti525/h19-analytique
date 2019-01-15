import { Request, Response } from 'express';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../DB/entity/profile.entitiy';
import { WebsiteurlService } from '../service/websiteurl.service';
import { WebSiteUrl } from '../DB/entity/websiteurl.entity';
import { AdvancedConsoleLogger } from 'typeorm';

export class ProfileController {
    private profileService: ProfileService= new ProfileService();
    private websiteurlService: WebsiteurlService= new WebsiteurlService();

    public async addProfile(req: Request, res: Response, next) {
        try{
            const profile = await this.generateProfile(req.body,res);
            if(profile){
                res.json(await this.profileService.addProfile(profile)).status(201);
            }
        }
        catch (error){
            return res.json(error).status(500);
        }
    }

    public async deleteProfile(req: Request, res: Response) {
        try{
            if (req.query.id){
                const deletedProfile = await this.profileService.deleteProfile(req.query.id);
                if (deletedProfile){
                    res.send(204);
                }
                else {
                    res.sendStatus(404);
                }
            }
            else {
                res.status(400).json(`no id was provided`);
            }
        }
        catch (error){
            return res.json(error).status(500);
        }
    }

    public async update(req: Request, res: Response,next) {
        
        try{
            const profile = await this.generateProfile(req.body,res,true);
        if (profile){
            res.json(await this.profileService.updateProfile(profile)).status(200);
        }
         }
        catch (error){
            return res.json(error).status(500);
        }
    }

    public async getProfile(req: Request, res: Response) {
        try{
            let response: any;
            if (req.query.id){
                response = await this.profileService.getProfileById(req.query.id)
            }
            else if (req.query.url){
                response = await this.websiteurlService.getProfileByUrl(req.query.url)
            }
            else if (req.query.profile){
                response = await this.profileService.getProfileByType(req.query.profile)
            }
            else {
                res.status(400).json(`invalid url parameter`);
                return;
            }
            if(response){
                res.status(200).json(response);
            }
            else{
                res.send(404);
            }
        }
        catch (error){
            return res.json(error).status(500);
        }
    }

    private async generateProfile(body: any,res: Response,isUpdate: boolean = false): Promise<Profile> {
        if(!(await this.profileService.isProfileValid(body,isUpdate))){
            res.status(400).json('The profile is not valid');
            return undefined;
        }
        const profile = new Profile();
        profile.id = body.id;
        profile.profile = body.profile;
        const websiteurls: WebSiteUrl[] = [];
        if(body.websiteurls){
            for(const websiteurl of body.websiteurls){
                if (!this.websiteurlService.isWebsiteurlValid(websiteurl)){
                    res.status(400).json(`The website url is not valid : ${websiteurl.url}`);
                    return undefined;
                };
                websiteurls.push({url: websiteurl.url})
            }
            profile.websiteurls = websiteurls;
        }
        return profile;
    }
}

//ACM 499 token required, c'est le code a renvoyer si on a pas de token.