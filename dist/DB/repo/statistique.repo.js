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
const statistique_entitiy_1 = require("../entity/statistique.entitiy");
class StatistiqueRepo {
    static findOSBySiteWebId(SiteWebId) {
        return __awaiter(this, void 0, void 0, function* () {
            const statistiqueRepo = typeorm_1.getRepository(statistique_entitiy_1.Statistique);
            return yield statistiqueRepo.find({
                select: ['os'],
                where: {
                    userId: SiteWebId
                },
            });
        });
    }
    static findPaysBySiteWebId(SiteWebId) {
        return __awaiter(this, void 0, void 0, function* () {
            const statistiqueRepo = typeorm_1.getRepository(statistique_entitiy_1.Statistique);
            return yield statistiqueRepo.find({
                select: ['pays'],
                where: {
                    userId: SiteWebId
                },
            });
        });
    }
    static findResolutionBySiteWebId(SiteWebId) {
        return __awaiter(this, void 0, void 0, function* () {
            const statistiqueRepo = typeorm_1.getRepository(statistique_entitiy_1.Statistique);
            return yield statistiqueRepo.find({
                select: ['resolution'],
                where: {
                    userId: SiteWebId
                },
            });
        });
    }
}
exports.StatistiqueRepo = StatistiqueRepo;
//# sourceMappingURL=statistique.repo.js.map