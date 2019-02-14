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
const statistique_repo_1 = require("../DB/repo/statistique.repo");
class StatistiqueService {
    getOSBySiteWebId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield statistique_repo_1.StatistiqueRepo.findOSBySiteWebId(id);
        });
    }
    getResolutionBySiteWebId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield statistique_repo_1.StatistiqueRepo.findResolutionBySiteWebId(id);
        });
    }
    getPaysBySiteWebId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield statistique_repo_1.StatistiqueRepo.findPaysBySiteWebId(id);
        });
    }
}
exports.StatistiqueService = StatistiqueService;
//# sourceMappingURL=statistique.service.js.map