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
const profile_repo_1 = require("../DB/repo/profile.repo");
class ProfileService {
    getProfiles(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield profile_repo_1.ProfileRepo.findAll(filter);
        });
    }
    getProfilesByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield profile_repo_1.ProfileRepo.findUserProfile(user);
        });
    }
    getProfileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield profile_repo_1.ProfileRepo.findById(id);
        });
    }
    addProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield profile_repo_1.ProfileRepo.createOrUpdate(profile);
        });
    }
    updateProfile(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield profile_repo_1.ProfileRepo.createOrUpdate(profile);
        });
    }
    deleteProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield profile_repo_1.ProfileRepo.findById(id);
            if (profile.campaigns.length > 0) {
                throw new Error("Impossible de supprimer un profil qui est lié à une campagne");
            }
            return yield profile_repo_1.ProfileRepo.delete(profile);
        });
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map