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
const token_service_1 = require("../service/token.service");
// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
exports.analyticsTokenGuard = (() => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const tokenService = token_service_1.TokenService.getInstance();
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).send("Analytic token is missing");
    }
    if (yield tokenService.isTokenValid(token)) {
        next();
    }
    else {
        return res.status(401).send("Invalid analytic token");
    }
}));
//# sourceMappingURL=token.guard.js.map