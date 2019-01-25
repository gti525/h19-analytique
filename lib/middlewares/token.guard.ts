import { RequestHandler } from "express-serve-static-core";
import { TokenService } from "../service/token.service";
import { IncomingHttpHeaders } from "http";
import express = require("express");

// inspired from https://gorrion.io/blog/node-express-js-typescript-sequelize#prepare-and-secure-routing and
// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens#toc-route-middleware-to-protect-api-routes
export const tokenGuard: (() => RequestHandler) = (() => (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token){
        return res.render("error/err403");
    }
    if (TokenService.isTokenValid(token)){
        next()
    } else {
        return res.render("error/err403");
    }
});