"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_infos_1 = require("../models/interfaces/client-infos");
const _ = require("lodash");
const client_service_1 = require("../service/client.service");
const token_service_1 = require("../service/token.service");
const advertisment_service_1 = require("../service/advertisment.service");
const fs = require('fs');
class AdvertiseController {
    constructor() {
        const codePath = process.env.NODE_ENV === 'production' ? 'analitycscode/code/analytics.prod.js' : 'analitycscode/code/analytics.min.js';
        this.code = fs.readFileSync(codePath, 'utf8');
        this.clientService = new client_service_1.ClientService();
        this.tokenService = token_service_1.TokenService.getInstance();
        this.advertismentService = new advertisment_service_1.AdvertismentService();
    }
    getAnalitycsCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(this.code);
        });
    }
    trackClient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientInfos = this.generateClientInfos(req.body);
            let client = yield this.clientService.getClientByHashOrId(clientInfos.hash);
            if (_.isEmpty(client)) {
                client = clientInfos.generateClientEntity();
                this.clientService.addClient(client);
            }
            res.status(200).send(clientInfos.hash);
        });
    }
    getBanner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let error = "";
            // le id du client traqued
            const [clientId, bannerId, userId] = this.validateBannerInfo(req, error);
            // TODO utiliser le token dans le header
            const banner = yield this.advertismentService.getBanner(clientId, bannerId, userId);
            if (banner && _.isEmpty(error))
                res.status(200).send(banner);
            else
                res.status(400).send(error);
        });
    }
    addClick(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("CLICK");
        });
    }
    validateBannerInfo(req, error) {
        const clientId = req.body.userId;
        // le id de la baniere
        const bannerId = req.body.bannerId;
        // le token de ladmin si site web
        const userId = this.tokenService.decodeToken(req.headers['x-access-token']).id;
        if (_.isEmpty(clientId) || _.isEmpty(bannerId)) {
            error = "clientId or bannerId missing";
        }
        return [clientId, bannerId, userId];
    }
    generateClientInfos(body) {
        const clientInfo = new client_infos_1.ClientInfo();
        clientInfo.graphicCard = body.webglinfo;
        clientInfo.languages = body.languages;
        clientInfo.os = body.platform;
        if (body.plugins)
            clientInfo.plugins = body.plugins.split('.');
        if (body.screen && body.screen.split('.').length === 3)
            [clientInfo.screenWidth, clientInfo.screenHeight, clientInfo.screenColorDepth] = body.screen.split('.');
        if (body.location && body.location.split('X').length === 2)
            [clientInfo.latitude, clientInfo.longitude] = body.location.split('X');
        clientInfo.url = body.host;
        clientInfo.completeUrl = body.href;
        clientInfo.doNotTrack = body.doNotTrack;
        clientInfo.canvasHash = body.canvas;
        clientInfo.browser = body.browser;
        _.pickBy(clientInfo, _.identity);
        clientInfo.generateHash();
        return clientInfo;
    }
}
exports.AdvertiseController = AdvertiseController;
//# sourceMappingURL=advertiseController.js.map