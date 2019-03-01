import { RequestHandler } from "express-serve-static-core";
import { UserRoles } from "../models/enums/role-enums";
import { UserService } from "../service/user.service";

// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
export const roleGuard: ((roles: UserRoles[]) => RequestHandler) = ((roles: UserRoles[]) => async (req, res, next) => {
    const userService = new UserService();
    let user = await userService.findById(req.session.user);
    if (user && roles.find(r => r === user.role)){
        next()
    } else {
        return res.render('error/err404')
    }
});
