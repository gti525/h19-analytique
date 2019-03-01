"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = require("../service/token.service");
// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
exports.analyticsTokenGuard = (() => (req, res, next) => {
    const tokenService = token_service_1.TokenService.getInstance();
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).send("Analytic token is missing");
    }
    if (tokenService.isTokenValid(token)) {
        next();
    }
    else {
        return res.status(401).send("Invalid analytic token");
    }
});
//# sourceMappingURL=token.guard.js.map