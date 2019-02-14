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
const campaign_entity_1 = require("../entity/campaign.entity");
const banner_entity_1 = require("../entity/banner.entity");
class CampaignRepo {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            return yield campaignRepo.findOne(id, { relations: ["banners", "profiles"] });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            return yield campaignRepo.find({ relations: ["banners", "profiles"] });
        });
    }
    static createOrUpdate(campaign) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            return yield campaignRepo.save(campaign);
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            const campaignToDelete = yield CampaignRepo.findById(id);
            if (campaignToDelete)
                yield CampaignRepo.deleteBanners(campaignToDelete.banners);
            return yield campaignRepo.remove(campaignToDelete);
        });
    }
    static deleteBanners(banners) {
        return __awaiter(this, void 0, void 0, function* () {
            const bannerRepo = typeorm_1.getRepository(banner_entity_1.Banner);
            return yield bannerRepo.remove(banners);
        });
    }
}
exports.CampaignRepo = CampaignRepo;
//# sourceMappingURL=campaign.repo.js.map