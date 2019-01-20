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
const user_entitiy_1 = require("../../DB/entity/user.entitiy");
const typeorm_1 = require("typeorm");
class UserRepo {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_entitiy_1.User);
            return yield userRepository.findOne(id);
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_entitiy_1.User);
            return yield userRepository.save(user);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = typeorm_1.getRepository(user_entitiy_1.User);
            const userToDelete = yield UserRepo.findById(id);
            if (userToDelete)
                yield userRepository.delete(userToDelete);
        });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=user.repo.js.map