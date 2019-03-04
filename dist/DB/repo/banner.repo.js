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
const typeorm_1 = require("typeorm");
const banner_entity_1 = require("../entity/banner.entity");
class BannerRepo {
    static getTargettedBanners(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getManager().query(`select distinct banner.id  FROM banner
            JOIN campaign ON campaign.id = banner.campaignsId
            JOIN campaign_profiles_profile ON campaign_profiles_profile.campaignId = campaign.id
            JOIN profile ON campaign_profiles_profile.profileId = profile.id
            JOIN web_site_url  ON profile.id = web_site_url.profileId
            JOIN client_statistic ON  client_statistic.url Like CONCAT("%", web_site_url.url, "%") 
            where client_statistic.id in (select client_statistic.id from client_statistic
                    where client_statistic.url Like CONCAT("%", web_site_url.url, "%") 
                                       group by client_statistic.clientId having count(*) > 5)
                  and client_statistic.userId = ${clientId};`);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bannerRepo = typeorm_1.getRepository(banner_entity_1.Banner);
            return yield bannerRepo.findOne(id);
        });
    }
}
exports.BannerRepo = BannerRepo;
//# sourceMappingURL=banner.repo.js.map