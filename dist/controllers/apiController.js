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
class apiController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const password = req.body.password;
                const token = yield this.userService.authenticate(id, password);
                res.json(token).status(200);
            }
            catch (_a) {
                res.status(401).send('Invalid credentials');
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new user_entitiy_1.User();
                user.username = req.body.username;
                user.role = req.body.password;
                user.password = req.body.password;
                const result = yield this.userService.adduser(user);
                result ? res.json(result).status(200) : res.status(409);
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
exports.apiController = apiController;
//# sourceMappingURL=apiController.js.map