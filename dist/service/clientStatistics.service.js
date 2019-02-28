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
const stats_repo_1 = require("../DB/repo/stats.repo");
const campaign_service_1 = require("./campaign.service");
class ClientStatisticsService {
    constructor() {
        this.campaignService = new campaign_service_1.CampaignService();
    }
    save(clientStatistics) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stats_repo_1.ClientStatisticRepo.save(clientStatistics);
        });
    }
    countBannersClicked(user, targeted) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            for (const c of user.campaigns) {
                const campaign = yield this.campaignService.getCampaignById(c.id);
                for (const b of campaign.banners) {
                    total += yield stats_repo_1.ClientStatisticRepo.countBannersClicked(b, targeted);
                }
            }
            return total;
        });
    }
    countBannersViewed(user, targeted) {
        return __awaiter(this, void 0, void 0, function* () {
            let total = 0;
            for (const c of user.campaigns) {
                const campaign = yield this.campaignService.getCampaignById(c.id);
                for (const b of campaign.banners) {
                    total += yield stats_repo_1.ClientStatisticRepo.countBannersViewed(b, targeted);
                }
            }
            return total;
        });
    }
}
exports.ClientStatisticsService = ClientStatisticsService;
//# sourceMappingURL=clientStatistics.service.js.map