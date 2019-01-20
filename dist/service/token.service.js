"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
var secret = 'JFEAN9832u42348329048234FJNJKfjkjdlkf92349032'; // TODO mettre ca dans la config
class TokenService {
    static createToken(id, role) {
        return jwt.sign({
            role,
            id
        }, secret, { expiresIn: '1h' });
    }
    static decodeToken(token) {
        try {
            return jwt.verify(token, secret);
        }
        catch (_a) {
            console.log('Token was not valid');
            return undefined;
        }
    }
    static isTokenValid(token) {
        return TokenService.decodeToken(token) !== undefined;
    }
}
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map