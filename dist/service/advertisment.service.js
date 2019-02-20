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
const client_service_1 = require("./client.service");
const clientStats_1 = require("../DB/entity/clientStats");
const clientStatistics_service_1 = require("./clientStatistics.service");
const moment = require("moment");
const typeorm_1 = require("typeorm");
const websiteurl_service_1 = require("./websiteurl.service");
class AdvertismentService {
    constructor() {
        this.clientService = new client_service_1.ClientService();
        this.webSiteUrlService = new websiteurl_service_1.WebsiteurlService();
        this.clientStatisticsService = new clientStatistics_service_1.ClientStatisticsService();
    }
    /**
     * Va permettre de donner les infos de la baniere et aussi d'empêcher de se faire hacker
     */
    getBanner(client, bannerType, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {};
            const banner = yield this.findTargeterBanner(client, bannerType);
            if (!banner)
                return undefined;
            response.url = banner.url;
            response.img = banner.image;
            response.bannerId = banner.id;
            response.bannerType = bannerType;
            response.size = this.getBannerSize(bannerType);
            yield this.addClientStatistic(client, url, banner);
            return response;
        });
    }
    addClientStatistic(client, url, banner, isClick = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client) {
                let stats = new clientStats_1.ClientStatistic();
                stats.url = url;
                stats.banner = banner;
                stats.isClick = isClick;
                stats.isView = !isClick;
                stats.isTargeted = client.isTargettable;
                stats.client = client;
                stats = yield this.clientStatisticsService.save(stats);
            }
            else {
                throw new Error("CLIENT WAS NOT FOUND WHEN ADDING STATISTIC");
            }
        });
    }
    findTargeterBanner(client, bannerType) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaigns = yield this.getTargetedCampaigns(client);
            const max = campaigns.length;
            if (max < 1)
                throw new Error("No banners found!");
            let banner;
            const index = Math.floor(Math.random() * max);
            switch (bannerType) {
                case banner_id_enum_1.BannerOrientation.vertical:
                    banner = campaigns[index].banners.find(b => b.type === campaign_entity_1.BannerType.Verticale);
                    break;
                case banner_id_enum_1.BannerOrientation.horizontal:
                    banner = campaigns[index].banners.find(b => b.type === campaign_entity_1.BannerType.Horizontale);
                    break;
                case banner_id_enum_1.BannerOrientation.mobile:
                    banner = campaigns[index].banners.find(b => b.type === campaign_entity_1.BannerType.Mobile);
                    break;
            }
            if (banner)
                return banner;
            else
                throw new Error("No banner " + bannerType + " was found for this campain : " + JSON.stringify(campaigns.map(c => c)));
        });
    }
    getTargetedCampaigns(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const tagettedUrls = this.getTargettedUrls(client);
            const campaigns = (yield campaign_repo_1.CampaignRepo.findAll()).filter(c => moment(c.endDate).endOf('day').isSameOrBefore(new Date()) &&
                moment(c.startDate).startOf('day').isSameOrAfter(new Date()));
            this.webSiteUrlService.findProfilesByUrl({ url: typeorm_1.In(tagettedUrls) });
            //finding the existing campaings
            tagettedUrls.forEach(url => {
            });
            return campaigns;
        });
    }
    getTargettedUrls(client) {
        const url_visits = {};
        const tagettedUrls = [];
        // grouping urls and counting the number of occurences
        client.clientStats.forEach(s => {
            url_visits[s.url] = (url_visits[s.url] || 0) + 1;
        });
        // if 10 or more visits
        Object.keys(url_visits).forEach(k => {
            if (url_visits[k] > 20) {
                tagettedUrls.push(k);
            }
        });
        return tagettedUrls;
    }
    getBannerSize(bannerType) {
        const size = {};
        switch (bannerType) {
            case campaign_entity_1.BannerType.Verticale:
                size.height = banner_id_enum_1.BannerSize.verticalHeight;
                size.width = banner_id_enum_1.BannerSize.verticalWidth;
                break;
            case campaign_entity_1.BannerType.Horizontale:
                size.height = banner_id_enum_1.BannerSize.horizontalHeight;
                size.width = banner_id_enum_1.BannerSize.horizontalWidth;
                break;
            case campaign_entity_1.BannerType.Mobile:
                size.height = banner_id_enum_1.BannerSize.mobileHeight;
                size.width = banner_id_enum_1.BannerSize.mobileWidth;
                break;
        }
        return size;
    }
}
exports.AdvertismentService = AdvertismentService;
//# sourceMappingURL=advertisment.service.js.map