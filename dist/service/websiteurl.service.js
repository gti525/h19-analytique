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
const websiteurl_repo_1 = require("../DB/repo/websiteurl.repo");
const _ = require("lodash");
class WebsiteurlService {
    addWebsiteurl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield websiteurl_repo_1.WebsiteurlRepo.createOrUpdate(url);
        });
    }
    updateWebsiteurl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield websiteurl_repo_1.WebsiteurlRepo.createOrUpdate(url);
        });
    }
    getProfileByUrl(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield websiteurl_repo_1.WebsiteurlRepo.findById(id);
        });
    }
    deleteWebsiteurl(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield websiteurl_repo_1.WebsiteurlRepo.delete(id);
        });
    }
    isWebsiteurlValid(websiteurl) {
        return !_.isEmpty(websiteurl.url);
    }
}
exports.WebsiteurlService = WebsiteurlService;
//# sourceMappingURL=websiteurl.service.js.map