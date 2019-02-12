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
const jwt = require("jsonwebtoken");
const user_service_1 = require("./user.service");
var secret = 'JFEAN9832u42348329048234FJNJKfjkjdlkf92349032'; // TODO mettre ca dans la config
class TokenService {
    constructor() {
    }
    // TODO set enum not string
    createToken(id) {
        return jwt.sign({
            id
        }, secret);
    }
    static getInstance() {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }
    decodeToken(token) {
        try {
            return jwt.verify(token, secret);
        }
        catch (_a) {
            console.log('Token was not valid');
            return undefined;
        }
    }
    isTokenValid(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = this.decodeToken(token);
            if (decoded) {
                const userService = new user_service_1.UserService();
                return userService.userExists(decoded.id);
            }
            return false;
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map