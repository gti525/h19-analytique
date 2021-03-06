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
const profile_entitiy_1 = require("../entity/profile.entitiy");
class ProfileRepo {
    static findUserProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileRepo = typeorm_1.getRepository(profile_entitiy_1.Profile);
            return yield profileRepo.find({ where: { user }, relations: ["urls"] });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileRepo = typeorm_1.getRepository(profile_entitiy_1.Profile);
            return yield profileRepo.createQueryBuilder("profile")
                .whereInIds([id])
                .leftJoinAndSelect("profile.campaigns", "campaigns")
                .leftJoinAndSelect("profile.urls", "urls")
                .getOne();
        });
    }
    static findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileRepo = typeorm_1.getRepository(profile_entitiy_1.Profile);
            return yield profileRepo.find({ where: filter, relations: ["urls"] });
        });
    }
    static createOrUpdate(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileRepo = typeorm_1.getRepository(profile_entitiy_1.Profile);
            return yield profileRepo.save(profile);
        });
    }
    static delete(profileToDelete) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileRepo = typeorm_1.getRepository(profile_entitiy_1.Profile);
            if (profileToDelete)
                return yield profileRepo.remove(profileToDelete);
        });
    }
}
exports.ProfileRepo = ProfileRepo;
//# sourceMappingURL=profile.repo.js.map