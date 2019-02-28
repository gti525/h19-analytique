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
class BaseController {
    getUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userService = new user_service_1.UserService();
            if (req.headers && req.headers['x-access-token'])
                return yield userService.findByToken(req.headers['x-access-token']);
            if (req.session && req.session.user)
                return yield userService.findById(req.session.user);
            return undefined;
        });
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=baseController.js.map