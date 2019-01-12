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
var secret = 'secret'; // TODO mettre ca dans la config
class TokenService {
    static createToken(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            return jwt.sign({
                role,
                id
            }, secret, { expiresIn: '1h' });
        });
    }
    static isTokenValide(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jwt.verify(token, secret);
        });
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map