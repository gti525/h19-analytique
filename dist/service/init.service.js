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
const user_entitiy_1 = require("../DB/entity/user.entitiy");
const user_repo_1 = require("../DB/repo/user.repo");
const role_enums_1 = require("../models/enums/role-enums");
const income_entitiy_1 = require("../DB/entity/income.entitiy");
const income_repo_1 = require("../DB/repo/income.repo");
var sha1 = require('sha1');
class InitService {
    static initDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users.forEach((u) => __awaiter(this, void 0, void 0, function* () {
                if (!(yield user_repo_1.UserRepo.findByUsername(u))) {
                    const user = new user_entitiy_1.User();
                    user.password = sha1("test1234");
                    user.role = role_enums_1.UserRoles.ADMIN;
                    user.username = u;
                    if (u === 'webadmin') {
                        user.analyticToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
                        user.role = role_enums_1.UserRoles.WEBSITEADMIN;
                        const income = yield income_repo_1.IncomeRepo.create(new income_entitiy_1.Income());
                        user.income = income;
                    }
                    yield user_repo_1.UserRepo.createOrUpdate(user);
                }
            }));
        });
    }
}
InitService.users = ['admin', 'antoine', 'webadmin'];
exports.InitService = InitService;
//# sourceMappingURL=init.service.js.map