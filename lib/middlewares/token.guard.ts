import { RequestHandler } from "express-serve-static-core";
import { TokenService } from "../service/token.service";

// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
export const analyticsTokenGuard: (() => RequestHandler) = (() => (req, res, next) => {
    const tokenService = TokenService.getInstance();
    let token = req.headers['x-access-token'];
    if (!token){
        return res.status(400).send("Analytic token is missing");
    }
    if (tokenService.isTokenValid(token)){
        next()
    } else {
        return res.status(401).send("Invalid analytic token");
    }
});