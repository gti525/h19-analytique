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
            return yield campaignRepo.createQueryBuilder("campaign")
                .whereInIds([id])
                .leftJoinAndSelect("campaign.profiles", "profiles")
                .leftJoinAndSelect("campaign.banners", "banners")
                .getOne();
        });
    }
    static findByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            return yield campaignRepo.createQueryBuilder("campaign")
                .leftJoinAndSelect("campaign.profiles", "profiles")
                .leftJoinAndSelect("campaign.user", "user")
                .where(`user.id = :id`, { id: user.id })
                .leftJoinAndSelect("campaign.banners", "banners")
                .getMany();
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            return yield campaignRepo.createQueryBuilder("campaign")
                .leftJoinAndSelect("campaign.profiles", "profiles")
                .leftJoinAndSelect("campaign.banners", "banners")
                .getMany();
        });
    }
    static createOrUpdate(campaign) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            return yield campaignRepo.save(campaign);
        });
    }
    static deleteById(campaignToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            const campaignRepo = typeorm_1.getRepository(campaign_entity_1.Campaign);
            if (campaignToDelete)
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