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
const banner_id_enum_1 = require("../models/enums/banner-id-enum");
const campaign_repo_1 = require("../DB/repo/campaign.repo");
const campaign_entity_1 = require("../DB/entity/campaign.entity");
var sha1 = require('sha1');
class AdvertismentService {
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    getBanner(clientId, bannerType, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO Ajouter une view au user
            const response = {};
            response.bannerId = bannerType;
            const banner = yield this.findTargeterBanner(clientId, bannerType);
            response.url = banner.url;
            response.img = banner.image;
            response.size = this.getBannerSize(bannerType);
            return response;
        });
    }
    /**
     * La logique des banières va se faire ici.
     * @param clientId le id du client qui appelle la pub
     */
    findTargeterBanner(clientId, bannerType) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaigns = yield this.getTargetedCampaigns(clientId);
            const max = campaigns.length - 1;
            let banner;
            Math.floor(Math.random() * max);
            switch (bannerType) {
                case banner_id_enum_1.BannerId.vertical:
                    banner = campaigns[max].banners.find(b => b.type === campaign_entity_1.BannerType.Verticale);
                    break;
                case banner_id_enum_1.BannerId.horizontal:
                    banner = campaigns[max].banners.find(b => b.type === campaign_entity_1.BannerType.Horizontale);
                    break;
                case banner_id_enum_1.BannerId.mobile:
                    banner = campaigns[max].banners.find(b => b.type === campaign_entity_1.BannerType.Mobile);
                    break;
            }
            if (banner)
                return banner;
            else
                throw Error("No banner " + bannerType + " was found for this campain : " + JSON.stringify(campaigns[max]));
        });
    }
    getTargetedCampaigns(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO aller chercher les bannières ciblées
            return yield campaign_repo_1.CampaignRepo.findAll();
        });
    }
    getBannerSize(bannerId) {
        const size = {};
        switch (bannerId) {
            case banner_id_enum_1.BannerId.vertical:
                size.height = banner_id_enum_1.BannerSize.verticalHeight;
                size.width = banner_id_enum_1.BannerSize.verticalWidth;
                break;
            case banner_id_enum_1.BannerId.horizontal:
                size.height = banner_id_enum_1.BannerSize.horizontalHeight;
                size.width = banner_id_enum_1.BannerSize.horizontalWidth;
                break;
            case banner_id_enum_1.BannerId.mobile:
                size.height = banner_id_enum_1.BannerSize.mobileHeight;
                size.width = banner_id_enum_1.BannerSize.mobileWidth;
                break;
        }
        return size;
    }
}
exports.AdvertismentService = AdvertismentService;
//# sourceMappingURL=advertisment.service.js.map