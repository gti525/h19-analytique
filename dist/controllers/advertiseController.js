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
const advertisment_service_1 = require("../service/advertisment.service");
const baseController_1 = require("./baseController");
const clientStatistics_service_1 = require("../service/clientStatistics.service");
const fs = require('fs');
var Geolocation = require('geo-core');
class AdvertiseController extends baseController_1.BaseController {
    constructor() {
        super();
        const analyticCodePath = process.env.NODE_ENV === 'production' ? 'analitycscode/clientCode/client.prod.js' : 'analitycscode/clientCode/client.min.js';
        this.analyticCode = fs.readFileSync(analyticCodePath, 'utf8');
        const bannerCodePath = process.env.NODE_ENV === 'production' ? 'analitycscode/bannerCode/banner.prod.js' : 'analitycscode/bannerCode/banner.min.js';
        this.bannerCode = fs.readFileSync(bannerCodePath, 'utf8');
        this.clientService = new client_service_1.ClientService();
        this.advertismentService = new advertisment_service_1.AdvertismentService();
        this.clientStatisticsService = new clientStatistics_service_1.ClientStatisticsService();
    }
    getAnalitycsCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(this.analyticCode);
        });
    }
    getBannersCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send(this.bannerCode);
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
            try {
                const [clientId, bannerType] = this.validateBannerInfo(req);
                const client = yield this.getClient(clientId);
                const user = yield this.getUser(req);
                const banner = yield this.advertismentService.getBanner(client, user, bannerType, req.headers.referer);
                if (banner) {
                    res.status(200).send(banner);
                }
                else {
                    res.status(500).send({ message: "No banner found at the moment" });
                }
            }
            catch (error) {
                res.status(500).send({ message: JSON.stringify(error) });
            }
        });
    }
    getClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clientService.getClientByHashOrId(clientId);
        });
    }
    addClick(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.clientStatisticsService.setClick(req.params.clientStatisticId);
                res.sendStatus(204);
            }
            catch (error) {
                res.status(500).send({ message: JSON.stringify(error) });
            }
        });
    }
    validateBannerInfo(req) {
        const clientId = req.params.clientId;
        // le id de la baniere
        const bannerType = req.params.bannerType;
        // le token de ladmin si site web
        if (_.isEmpty(clientId) || _.isEmpty(bannerType)) {
            throw new Error("clientId or bannerType missing");
        }
        return [clientId, bannerType];
    }
    generateClientInfos(body) {
        const clientInfo = new client_infos_1.ClientInfo();
        var GeoManager = new Geolocation({ radius: 100 });
        clientInfo.graphicCard = body.webglinfo;
        clientInfo.languages = body.languages;
        clientInfo.os = body.platform;
        if (body.plugins)
            clientInfo.plugins = body.plugins.split('.');
        if (body.screen && body.screen.split('.').length === 3)
            [clientInfo.screenWidth, clientInfo.screenHeight, clientInfo.screenColorDepth] = body.screen.split('.');
        if (body.location && body.location.split('X').length === 2)
            [clientInfo.latitude, clientInfo.longitude] = body.location.split('X');
        GeoManager.findNearbyLocations({
            lat: clientInfo.latitude,
            lon: clientInfo.longitude
        }, function (locations) {
            clientInfo.country = locations[0].country;
        });
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