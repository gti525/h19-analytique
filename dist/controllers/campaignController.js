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
const campaign_service_1 = require("../service/campaign.service");
const campaign_entity_1 = require("../DB/entity/campaign.entity");
const enumsToArray_1 = require("../helpers/enumsToArray");
const banner_entity_1 = require("../DB/entity/banner.entity");
const profile_service_1 = require("../service/profile.service");
const typeorm_1 = require("typeorm");
const baseController_1 = require("./baseController");
const check_1 = require("express-validator/check");
class CampaignController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.campaignService = new campaign_service_1.CampaignService();
        this.profileService = new profile_service_1.ProfileService();
        this.enumsToArray = new enumsToArray_1.EnumsToArray();
        this.validate = () => {
            return [
                check_1.check("startDate", "La date de début est requise.").not().isEmpty(),
                check_1.check("endDate", "La date de fin est requise.").not().isEmpty(),
                check_1.check('banners.*.url', "Le url est requis.").not().isEmpty(),
                check_1.check('banners.*.image', "L'image publicitaire est requise.").not().isEmpty()
            ];
        };
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaigns = yield this.campaignService.getCampaignByUser(yield this.getUser(req));
            yield this.sendResponse(req, res, 'campaign/index', { campaigns, moment: require("moment") });
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (req.method !== 'GET' && req.method !== 'POST') {
                result = next();
            }
            let content = {};
            content.campaignTypes = yield this.enumsToArray.translateEnumToSelectArray(campaign_entity_1.BannerType);
            content.profiles = yield this.profileService.getProfilesByUser(yield this.getUser(req));
            if (req.method == 'POST') {
                const vResult = check_1.validationResult(req);
                if (vResult.isEmpty()) {
                    try {
                        const banners = [];
                        req.body.banners.forEach(function (e) {
                            const banner = new banner_entity_1.Banner();
                            banner.url = e.url;
                            banner.image = e.image;
                            banner.type = e.type;
                            banners.push(banner);
                        });
                        const profileIds = req.body.profileIds.map(function (value) {
                            return parseInt(value, 10);
                        });
                        const profiles = yield this.profileService.getProfiles({ id: typeorm_1.In(profileIds) });
                        const campaign = new campaign_entity_1.Campaign();
                        campaign.startDate = req.body.startDate;
                        campaign.endDate = req.body.endDate;
                        campaign.banners = banners;
                        campaign.profiles = profiles;
                        campaign.user = yield this.getUser(req);
                        yield this.campaignService.addCampaign(campaign);
                        result = res.redirect("/campaign");
                    }
                    catch (error) {
                        content.errors = [error];
                    }
                }
                else {
                    content.errors = this.formatErrors(vResult.array());
                }
            }
            return result || (yield this.sendResponse(req, res, 'campaign/create', content));
        });
    }
    edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (req.method !== 'GET' && req.method !== 'POST') {
                result = next();
            }
            let content = {};
            content.campaignTypes = yield this.enumsToArray.translateEnumToSelectArray(campaign_entity_1.BannerType);
            content.profiles = yield this.profileService.getProfilesByUser(yield this.getUser(req));
            content.campaign = yield this.campaignService.getCampaignById(req.params.id);
            content.moment = require("moment");
            if (req.method == 'POST') {
                const vResult = check_1.validationResult(req);
                if (vResult.isEmpty()) {
                    try {
                        const campaign = yield this.campaignService.getCampaignById(req.body.id);
                        campaign.startDate = req.body.startDate;
                        campaign.endDate = req.body.endDate;
                        campaign.banners.forEach(function (banner) {
                            const newBanner = req.body.banners.filter(function (b) {
                                return b.id == banner.id;
                            })[0];
                            banner.url = newBanner.url;
                            banner.image = newBanner.image;
                        });
                        const profileIds = req.body.profileIds.map(function (value) {
                            return parseInt(value, 10);
                        });
                        campaign.profiles = yield this.profileService.getProfiles({ id: typeorm_1.In(profileIds) });
                        yield this.campaignService.updateCampaign(campaign);
                        res.redirect("/campaign");
                    }
                    catch (error) {
                        content.errors = [error];
                    }
                }
                else {
                    content.errors = this.formatErrors(vResult.array());
                }
            }
            yield this.sendResponse(req, res, 'campaign/edit', content);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    yield this.campaignService.deleteCampaign(req.params.id);
                    res.redirect("/campaign");
                }
            }
            catch (error) {
                const message = 'Impossible de supprimer une campagne ayant généré des revenus.';
                const campaigns = yield this.campaignService.getCampaignByUser(yield this.getUser(req));
                yield this.sendResponse(req, res, 'campaign/index', { errors: [message], campaigns, moment: require("moment") });
            }
            ;
        });
    }
}
exports.CampaignController = CampaignController;
//# sourceMappingURL=campaignController.js.map