import { Request, Response } from 'express';
import { ClientInfo } from '../models/interfaces/client-infos'
import { BannerId, BannerSize } from '../models/enums/banner-id-enum'
import * as _ from 'lodash'
import { ClientService } from '../service/client.service';
const fs = require('fs');
export class AdvertiseController {
    private code;
    private clientService: ClientService;
    constructor(){
        const codePath = process.env.NODE_ENV === 'production' ? 'analitycscode/code/analytics.prod.js': 'analitycscode/code/analytics.min.js';
            this.code = fs.readFileSync(codePath, 'utf8');
        this.clientService = new ClientService();
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
        // le id du client traqued
        console.log(req.body.userId);

        // le id de la baniere
        console.log(req.body.bannerId);
        const bannerId = req.body.bannerId;
        // le token de ladmin si site web
        console.log(req.headers['x-access-token']);
        // TODO utiliser le token dans le header

        const response = this.validateBannerInfos(bannerId);
        if (response)
            res.status(200).send(response);
        else
            res.status(400).send();
    }

    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    private validateBannerInfos(bannerId: any): any {
        const response: any = {};
        response.bannerId = bannerId;
        response.url = "https://ici.radio-canada.ca/premiere/emissions/desautels-le-dimanche";
        // Todo aller cherhcer cette image dans la bd
        response.img = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
        response.size = this.getBannerSize(bannerId);
        return response;
    }

    private getBannerSize(bannerId): any{
        const size: any = {};
        switch (bannerId){
            case BannerId.vertical:
                size.height =  BannerSize.verticalHeight;
                size.width =  BannerSize.verticalWidth;
                break;
            case BannerId.horizontal:
                size.height =  BannerSize.horizontalHeight;
                size.width =  BannerSize.horizontalWidth;
                break;
            case BannerId.mobile:
                size.height =  BannerSize.mobileHeight;
                size.width =  BannerSize.mobileWidth;
                break;
        }
        return size;
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