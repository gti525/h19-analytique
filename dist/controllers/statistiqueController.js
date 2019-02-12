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
const statistique_service_1 = require("../service/statistique.service");
const websiteurl_service_1 = require("../service/websiteurl.service");
class StatistiqueController {
    constructor() {
        this.statistiqueService = new statistique_service_1.StatistiqueService();
        this.websiteurlService = new websiteurl_service_1.WebsiteurlService();
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.params.id = 1; // à changé une fois les liens BDD ok
            try {
                let os, resolutions, pays;
                if (req.params.id) {
                    os = yield this.statistiqueService.getOSBySiteWebId(req.params.id);
                    resolutions = yield this.statistiqueService.getResolutionBySiteWebId(req.params.id);
                    pays = yield this.statistiqueService.getPaysBySiteWebId(req.params.id);
                }
                res.render('statistique', { os: os, resolutions: resolutions, pays: pays });
            }
            catch (error) {
                return res.json(error).status(500);
            }
        });
    }
}
exports.StatistiqueController = StatistiqueController;
//ACM 499 token required, c'est le code a renvoyer si on a pas de token.
//# sourceMappingURL=statistiqueController.js.map