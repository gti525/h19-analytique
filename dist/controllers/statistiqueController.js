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
const baseController_1 = require("./baseController");
class StatistiqueController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.statistiqueService = new statistique_service_1.StatistiqueService();
        this.websiteurlService = new websiteurl_service_1.WebsiteurlService();
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield this.statistiqueService.getClients(yield this.getUser(req));
                yield this.sendResponse(req, res, 'statistique', { clients });
            }
            catch (error) {
                return res.send(error).status(500);
            }
        });
    }
}
exports.StatistiqueController = StatistiqueController;
//# sourceMappingURL=statistiqueController.js.map