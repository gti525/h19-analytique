import { RequestHandler } from "express-serve-static-core";

// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
export const loginGuard = function(req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
};