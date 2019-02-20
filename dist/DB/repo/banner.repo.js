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
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bannerRepo = typeorm_1.getRepository(banner_entity_1.Banner);
            return yield bannerRepo.findOne(id);
        });
    }
}
exports.BannerRepo = BannerRepo;
//# sourceMappingURL=banner.repo.js.map