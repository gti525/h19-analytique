import { Request, Response } from 'express';
import { ClientInfo } from '../models/interfaces/client-infos'
import * as _ from 'lodash'
import { ClientService } from '../service/client.service';
const fs = require('fs');
export class AdvertiseController {
    private code;
    private clientService: ClientService;
    constructor(){
        this.code = fs.readFileSync('analitycscode/code/analytics.min.js', 'utf8');
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