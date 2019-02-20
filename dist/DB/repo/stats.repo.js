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
const clientStats_1 = require("../entity/clientStats");
class ClientStatisticRepo {
    static countBannersViewed(banner, isTargeted) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientStatisticRepo = typeorm_1.getRepository(clientStats_1.ClientStatistic);
            return yield clientStatisticRepo.count({ where: { banner, isView: true, isTargeted } });
        });
    }
    static countBannersClicked(banner, isTargeted) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientStatisticRepo = typeorm_1.getRepository(clientStats_1.ClientStatistic);
            return yield clientStatisticRepo.count({ where: { banner: banner, isClick: true, isTargeted } });
        });
    }
    static save(clientStatistic) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientStatisticRepo = typeorm_1.getRepository(clientStats_1.ClientStatistic);
            return yield clientStatisticRepo.save(clientStatistic);
        });
    }
}
exports.ClientStatisticRepo = ClientStatisticRepo;
//# sourceMappingURL=stats.repo.js.map