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
class ClientStatisticsService {
    setClick(clientStatisticId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientStatistic = yield stats_repo_1.ClientStatisticRepo.findById(clientStatisticId);
            clientStatistic.isView = false;
            clientStatistic.isClick = true;
            clientStatistic.date = new Date();
            this.save(clientStatistic);
        });
    }
    save(clientStatistics) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stats_repo_1.ClientStatisticRepo.save(clientStatistics);
        });
    }
    countBannersClicked(user, targeted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stats_repo_1.ClientStatisticRepo.countBannersClicked(user, targeted);
        });
    }
    countBannersViewed(user, targeted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stats_repo_1.ClientStatisticRepo.countBannersViewed(user, targeted);
        });
    }
}
exports.ClientStatisticsService = ClientStatisticsService;
//# sourceMappingURL=clientStatistics.service.js.map