"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
exports.loginGuard = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
};
//# sourceMappingURL=login.guard.js.map