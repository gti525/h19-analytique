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
const clientStats_1 = require("../DB/entity/clientStats");
const clientStatistics_service_1 = require("./clientStatistics.service");
const moment = require("moment");
const websiteurl_service_1 = require("./websiteurl.service");
const client_service_1 = require("./client.service");
const _ = require("lodash");
class AdvertismentService {
    constructor() {
        this.webSiteUrlService = new websiteurl_service_1.WebsiteurlService();
        this.clientService = new client_service_1.ClientService();
        this.clientStatisticsService = new clientStatistics_service_1.ClientStatisticsService();
    }
    /**
     * Retourne les bannieres ciblees
     */
    getBanner(client, user, bannerType, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {};
            const banner = yield this.findTargeterBanner(client, bannerType);
            if (!banner)
                return undefined;
            const clientStatistic = yield this.addClientStatistic(client, user, url, banner);
            response.url = banner.url;
            response.img = banner.image;
            response.clientStatisticId = clientStatistic.id;
            response.bannerType = bannerType;
            response.size = this.getBannerSize(bannerType);
            return response;
        });
    }
    addClientStatistic(client, user, url, banner, isClick = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (client) {
                let stats = new clientStats_1.ClientStatistic();
                stats.url = url;
                stats.banner = banner;
                stats.isClick = isClick;
                stats.isView = !isClick;
                stats.isTargeted = client.isTargeted;
                stats.client = client;
                stats.user = user;
                return yield this.clientStatisticsService.save(stats);
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
            client.isTargeted = false;
            let targettedCampaigns = undefined;
            const campaigns = (yield campaign_repo_1.CampaignRepo.findAll()).filter(c => moment(new Date()).endOf('day').isSameOrBefore(c.endDate)
                && moment(new Date()).startOf('day').isSameOrAfter(c.startDate));
            const tagettedUrls = this.getTargettedUrls(client);
            const webSiteUrls = (yield this.webSiteUrlService.findProfilesByUrl(tagettedUrls)).filter(p => !_.isEmpty(p.profile));
            if (campaigns.length > 0 && webSiteUrls.length > 0) {
                //finding the existing campaings that have profiles that matches the urls
                targettedCampaigns = campaigns.map(c => {
                    for (const w of webSiteUrls) {
                        for (const profile of c.profiles) {
                            if (profile.id === w.profile.id) {
                                return c;
                            }
                        }
                    }
                });
            }
            client.isTargeted = !_.isEmpty(targettedCampaigns);
            return _.isEmpty(targettedCampaigns) ? campaigns : targettedCampaigns;
        });
    }
    getTargettedUrls(client) {
        const url_visits = {};
        const minimumNumberOfVisits = 10;
        const tagettedUrls = [];
        // grouping urls and counting the number of occurences
        for (const stat of client.clientStats) {
            url_visits[stat.url] = (url_visits[stat.url] || 0) + 1;
        }
        ;
        // if 10 or more visits
        Object.keys(url_visits).forEach(k => {
            if (url_visits[k] >= minimumNumberOfVisits) {
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