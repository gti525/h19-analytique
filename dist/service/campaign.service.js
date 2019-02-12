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
const campaign_repo_1 = require("../DB/repo/campaign.repo");
class CampaignService {
    getCampaigns() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_repo_1.CampaignRepo.findAll();
        });
    }
    getCampaignById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_repo_1.CampaignRepo.findById(id);
        });
    }
    addCampaign(campaign) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_repo_1.CampaignRepo.createOrUpdate(campaign);
        });
    }
    updateCampaign(campaign) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_repo_1.CampaignRepo.createOrUpdate(campaign);
        });
    }
    deleteCampaign(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield campaign_repo_1.CampaignRepo.deleteById(id);
        });
    }
}
exports.CampaignService = CampaignService;
//# sourceMappingURL=campaign.service.js.map