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
class UserController {
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
                res.status(401).json('Invalid credentials');
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.id;
                const role = req.body.role;
                const password = req.body.password;
                const user = yield this.userService.adduser({ id, role, password });
                user ? res.json(user).status(200) : res.status(409);
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
exports.UserController = UserController;
//ACM 499 token required, c'est le code a renvoyer si on a pas de token.
//# sourceMappingURL=UserController.js.map