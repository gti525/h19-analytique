"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_service_1 = require("../service/token.service");
// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
exports.roleGuard = ((roles) => (req, res, next) => {
    const tokenService = token_service_1.TokenService.getInstance();
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    const role = tokenService.decodeToken(token).role;
    if (roles.find(r => r === role)) {
        next();
    }
    else {
        return res.status(403).send('Your role is not valid');
    }
});
//# sourceMappingURL=role.guard.js.map