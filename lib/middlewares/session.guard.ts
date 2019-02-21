import { RequestHandler } from "express-serve-static-core";
import { TokenService } from "../service/token.service";

// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
export const sessionGuard = function (req, res, next) {
    console.log('sessionguard')
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
};