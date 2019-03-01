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
const websiteurl_entity_1 = require("../entity/websiteurl.entity");
class WebsiteurlRepo {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const websiteurlRepo = typeorm_1.getRepository(websiteurl_entity_1.WebSiteUrl);
            return yield websiteurlRepo.findOne(id, { relations: ["profile"] });
        });
    }
    static find(tagettedUrls) {
        return __awaiter(this, void 0, void 0, function* () {
            const websiteurlRepo = typeorm_1.getRepository(websiteurl_entity_1.WebSiteUrl);
            return yield websiteurlRepo.find({ where: { url: typeorm_1.In(tagettedUrls) }, relations: ["profile"] });
        });
    }
    static createOrUpdate(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const websiteurlRepo = typeorm_1.getRepository(websiteurl_entity_1.WebSiteUrl);
            return yield websiteurlRepo.save(profile);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const websiteurlRepo = typeorm_1.getRepository(typeorm_1.getRepository);
            const urlToDelete = yield WebsiteurlRepo.findById(id);
            if (urlToDelete)
                yield websiteurlRepo.delete(urlToDelete);
        });
    }
}
exports.WebsiteurlRepo = WebsiteurlRepo;
//# sourceMappingURL=websiteurl.repo.js.map