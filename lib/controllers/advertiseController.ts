import { Request, Response } from 'express';
import { ClientInfo } from '../models/interfaces/client-infos'
import * as _ from 'lodash'
import { ClientService } from '../service/client.service';
import { TokenService } from '../service/token.service';
import { AdvertismentService } from '../service/advertisment.service';
import { UserService } from '../service/user.service';
import { User } from '../DB/entity/user.entitiy';
import { ClientStats } from '../DB/entity/clientStats';
import { BannerService } from '../service/bannerService';
import { Client } from '../DB/entity/client.entity';
import { Banner } from '../DB/entity/banner.entity';
import { BaseController } from './baseController';
const fs = require('fs');
export class AdvertiseController extends BaseController {
    private code;
    private clientService: ClientService;
    private tokenService: TokenService;
    private advertismentService: AdvertismentService
    private userService: UserService;
    private bannerService: BannerService;
    constructor(){
        super ();
        const codePath = process.env.NODE_ENV === 'production' ? 'analitycscode/code/analytics.prod.js': 'analitycscode/code/analytics.min.js';
            this.code = fs.readFileSync(codePath, 'utf8');
        this.clientService = new ClientService();
        this.tokenService = TokenService.getInstance();
        this.advertismentService = new AdvertismentService();
        this.userService =  new UserService();
        this.bannerService = new BannerService();
    }
    
    public async getAnalitycsCode(req: Request, res: Response) {
        res.status(200).send(this.code);
    }

    public async trackClient(req: Request, res: Response) {
        const clientInfos = this.generateClientInfos(req.body);
        let client = await this.clientService.getClientByHashOrId(clientInfos.hash);
        if(_.isEmpty(client)){
            client = clientInfos.generateClientEntity();
            this.clientService.addClient(client);
        }
        res.status(200).send(clientInfos.hash);
    }
    
    public async getBanner(req: Request, res: Response) {
        let error:string = "";
        
        const [clientId,bannerId,userId] = this.validateBannerInfo(req,error);
        // TODO utiliser le token dans le header
        const banner = await this.advertismentService.getBanner(clientId,bannerId,userId,req.headers.host)
        if (banner && _.isEmpty(error)){
            // TODO ajouter le userId dans le body
            res.status(200).send(banner);
        }
        else
            res.status(400).send(error);
    }

    private async getClient(req: Request) {
        return req.body.userId ? await this.clientService.getClientByHashOrId(req.body.userId) : undefined;
    }

    public async addClick(req: Request, res: Response) {
        // TODO ajouter le userId dans le body
        const user = await this.getUser(req);
        const client = await this.getClient(req);
        const banner = await this.bannerService.findById(req.query.bannerId);
        await this.advertismentService.updateBannerStatistics(client, user,req.headers.host,banner,true);
    }

    private validateBannerInfo(req: Request,error:string) {
        const clientId = req.body.userId;
        // le id de la baniere
        const bannerId = req.body.bannerId;
        // le token de ladmin si site web
        const userId = this.tokenService.decodeToken(req.headers['x-access-token'] as any).id;
        if (_.isEmpty(clientId) || _.isEmpty(bannerId)){
            error = "clientId or bannerId missing"
        }
        return [clientId,bannerId,userId];
    }

    private generateClientInfos(body: any): ClientInfo {
        const clientInfo = new ClientInfo();
        clientInfo.graphicCard = body.webglinfo;
        clientInfo.languages = body.languages;
        clientInfo.os = body.platform;
        if (body.plugins)
            clientInfo.plugins = body.plugins.split('.');
        if (body.screen && body.screen.split('.').length === 3)
            [clientInfo.screenWidth,clientInfo.screenHeight,clientInfo.screenColorDepth] = body.screen.split('.');
        if (body.location && body.location.split('X').length === 2)
            [clientInfo.latitude,clientInfo.longitude] = body.location.split('X');
        clientInfo.url = body.host;
        clientInfo.completeUrl = body.href;
        clientInfo.doNotTrack = body.doNotTrack;
        clientInfo.canvasHash = body.canvas
        clientInfo.browser = body.browser;
        _.pickBy(clientInfo,_.identity);
        clientInfo.generateHash();
        return clientInfo;
    }
}