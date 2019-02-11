import { RequestHandler } from "express-serve-static-core";
import { TokenService } from "../service/token.service";
import { UserRoles } from "../models/enums/role-enums";

// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
export const roleGuard: ((roles: UserRoles[]) => RequestHandler) = ((roles: UserRoles[]) => (req, res, next) => {
    const tokenService = TokenService.getInstance();
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    const role = tokenService.decodeToken(token).role;
    if (roles.find(r => r === role)){
        next()
    } else {
        return res.status(403).send('Your role is not valid')
    }
});