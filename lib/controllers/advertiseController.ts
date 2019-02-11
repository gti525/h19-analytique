import { Request, Response } from 'express';
import { ClientInfo } from '../models/interfaces/client-infos'
import { BannerId, BannerSize } from '../models/enums/banner-id-enum'
import * as _ from 'lodash'
import { ClientService } from '../service/client.service';
import { TokenService } from '../service/token.service';
import { AdvertismentService } from '../service/advertisment.service';
const fs = require('fs');
export class AdvertiseController {
    private code;
    private clientService: ClientService;
    private tokenService: TokenService;
    private advertismentService: AdvertismentService
    constructor(){
        const codePath = process.env.NODE_ENV === 'production' ? 'analitycscode/code/analytics.prod.js': 'analitycscode/code/analytics.min.js';
            this.code = fs.readFileSync(codePath, 'utf8');
        this.clientService = new ClientService();
        this.tokenService = TokenService.getInstance();
        this.advertismentService = new AdvertismentService();
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
        // le id du client traqued
        const [clientId,bannerId,userId] = this.validateBannerInfo(req,error);
        // TODO utiliser le token dans le header
        const banner = await this.advertismentService.getBanner(clientId,bannerId,userId)
        if (banner && _.isEmpty(error))
            res.status(200).send(banner);
        else
            res.status(400).send(error);
    }
    public async addClick(req: Request, res: Response) {
        console.log("CLICK");
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