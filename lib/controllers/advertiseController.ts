import { Request, Response } from 'express';
import { ClientInfo } from '../models/interfaces/client-infos'
import * as _ from 'lodash'
import { ClientService } from '../service/client.service';
import { AdvertismentService } from '../service/advertisment.service';
import { BaseController } from './baseController';
import { ClientStatisticsService } from '../service/clientStatistics.service';
const fs = require('fs');
export class AdvertiseController extends BaseController {
    private analyticCode;
    private bannerCode;
    private clientService: ClientService;
    private advertismentService: AdvertismentService
    private clientStatisticsService : ClientStatisticsService
    constructor(){
        super ();
        const analyticCodePath = process.env.NODE_ENV === 'production' ? 'analitycscode/clientCode/client.prod.js': 'analitycscode/clientCode/client.min.js';
        this.analyticCode = fs.readFileSync(analyticCodePath, 'utf8');
        const bannerCodePath = process.env.NODE_ENV === 'production' ? 'analitycscode/bannerCode/banner.prod.js': 'analitycscode/bannerCode/banner.min.js';
        this.bannerCode = fs.readFileSync(bannerCodePath, 'utf8');
        this.clientService = new ClientService();
        this.advertismentService = new AdvertismentService();
        this.clientStatisticsService = new ClientStatisticsService();
    }
    
    public async getAnalitycsCode(req: Request, res: Response) {
        res.status(200).send(this.analyticCode);
    }
    public async getBannersCode(req: Request, res: Response) {
        res.status(200).send(this.bannerCode);
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
        try{
            const [clientId,bannerType] = this.validateBannerInfo(req);
            const client = await this.getClient(clientId);
            const banner = await this.advertismentService.getBanner(client,bannerType,req.headers.host)
            if (banner){
                res.status(200).send(banner);
            }
            else{
                res.status(500).send({message:"No banner found at the moment"});    
            }
        }
        catch (error){
            res.status(500).send({message:JSON.stringify(error)});
        }
    }

    private async getClient(clientId) {
        return await this.clientService.getClientByHashOrId(clientId);
    }

    public async addClick(req: Request, res: Response) {
        try{
            await this.clientStatisticsService.setClick(req.params.clientStatisticId);
            res.sendStatus(204);
        }
        catch (error){
            res.status(500).send({message:JSON.stringify(error)});
        }
    }

    private validateBannerInfo(req: Request) {
        const clientId = req.params.clientId;
        // le id de la baniere
        const bannerType = req.params.bannerType;
        // le token de ladmin si site web
        if (_.isEmpty(clientId) || _.isEmpty(bannerType)){
            throw new Error("clientId or bannerType missing");
        }
        return [clientId,bannerType];
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