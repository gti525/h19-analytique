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
const user_service_1 = require("../service/user.service");
const typeorm_1 = require("typeorm");
const user_entitiy_1 = require("../DB/entity/user.entitiy");
const role_enums_1 = require("../models/enums/role-enums");
class AccountController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.body.username;
                const password = req.body.password;
                const token = yield this.userService.authenticate(username, password);
                res.render("index");
            }
            catch (_a) {
                res.status(401).send('Invalid credentials');
            }
        });
    }
    getLoginPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('account/login');
        });
    }
    getRegisterPage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const roles = {};
            roles[role_enums_1.UserRoles.CAMPAIGNMANAGER] = "Campaign administrator";
            roles[role_enums_1.UserRoles.WEBSITEADMIN] = "Website administrator";
            res.render('account/register', { roles });
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_entitiy_1.User();
                user.username = req.body.username;
                user.role = req.body.role;
                user.password = req.body.password;
                const result = yield this.userService.adduser(user);
                res.render("index");
            }
            catch (error) {
                if (error instanceof typeorm_1.QueryFailedError && error.code === 'ER_DUP_ENTRY') {
                    res.status(409).json(error.message);
                }
                else {
                    res.status(500).json(error);
                }
            }
        });
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=accountController.js.map