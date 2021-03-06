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
const income_entitiy_1 = require("../DB/entity/income.entitiy");
const income_repo_1 = require("../DB/repo/income.repo");
const _ = require("lodash");
const clientStatistics_service_1 = require("./clientStatistics.service");
class IncomeService {
    constructor() {
        this.clientStatisticService = new clientStatistics_service_1.ClientStatisticsService();
    }
    getIncome(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = new income_entitiy_1.Income();
            _.merge(income, user.income);
            income.regularClicks = yield this.clientStatisticService.countBannersClicked(user, false);
            income.regularViews = yield this.clientStatisticService.countBannersViewed(user, false);
            income.targetedClicks = yield this.clientStatisticService.countBannersClicked(user, true);
            income.targetedViews = yield this.clientStatisticService.countBannersViewed(user, true);
            return income;
        });
    }
    updateIncome(income) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield income_repo_1.IncomeRepo.createOrUpdate(income);
        });
    }
}
exports.IncomeService = IncomeService;
//# sourceMappingURL=income.service.js.map