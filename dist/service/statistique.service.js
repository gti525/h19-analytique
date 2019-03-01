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
const client_repo_1 = require("../DB/repo/client.repo");
const campaign_repo_1 = require("../DB/repo/campaign.repo");
const stats_repo_1 = require("../DB/repo/stats.repo");
class StatistiqueService {
    getClients(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield client_repo_1.ClientRepo.findAll();
            let banners = [];
            (yield campaign_repo_1.CampaignRepo.findByUser(user)).map((c) => {
                banners = banners.concat(c.banners);
            });
            const validClients = yield Promise.all(clients.map((client) => __awaiter(this, void 0, void 0, function* () {
                for (const banner of banners) {
                    if (yield stats_repo_1.ClientStatisticRepo.clientSawBanner(banner, client))
                        return client;
                }
            })));
            return validClients.filter(vc => vc);
        });
    }
}
exports.StatistiqueService = StatistiqueService;
//# sourceMappingURL=statistique.service.js.map