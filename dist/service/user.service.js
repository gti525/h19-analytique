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
const user_repo_1 = require("../DB/repo/user.repo");
const token_service_1 = require("./token.service");
var sha1 = require('sha1');
class UserService {
    adduser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = sha1(user.password);
            return yield user_repo_1.UserRepo.create(user);
        });
    }
    authenticate(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repo_1.UserRepo.findById(id);
            if (user && user.password === sha1(password)) {
                return token_service_1.TokenService.createToken(user.id, user.role);
            }
            throw new Error('Invalid password or username');
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map