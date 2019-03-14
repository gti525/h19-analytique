import { Request, Response } from 'express';
import {UserService} from "../service/user.service";
import {QueryFailedError} from "typeorm";
import {User} from "../DB/entity/user.entitiy";
import {UserRoles} from "../models/enums/role-enums";
import { Income } from '../DB/entity/income.entitiy';
import {check, validationResult} from "express-validator/check";
import { error } from 'util';
import {BaseController} from "./baseController";
import {EnumsToArray} from "../helpers/enumsToArray";
import {BannerType} from "../DB/entity/campaign.entity";

export class AccountController extends BaseController {

    private userService: UserService = new UserService();

    public async login(req: Request, res: Response, next) {
        let content: {[k: string]: any} = {};
        if (req.method == 'POST'){
            const vResult = validationResult(req);
            if(vResult.isEmpty()) {
                try {
                    const username = req.body.username;
                    const password = req.body.password;
                    const user = await this.userService.authenticate(username, password);
                    this.createUserSession(req, user, res);
                } catch(error) {
                    content.errors = [error.message];
                }
            }else{
                content.errors = this.formatErrors(vResult.array());
            }
        }
        return this.sendResponse(req, res,'account/login', content);
    }

    public async register(req: Request, res: Response, next) {

        let content: {[k: string]: any} = {};
        const roles = {};
        roles[UserRoles.CAMPAIGNMANAGER] = UserRoles.CAMPAIGNMANAGER;
        roles[UserRoles.WEBSITEADMIN] = UserRoles.WEBSITEADMIN;
        content.roles = roles;

        if (req.method == 'POST'){
            const vResult = validationResult(req);
            if(vResult.isEmpty()) {
                try {
                    const user = new User();
                    user.username = req.body.username;
                    user.role = req.body.role;
                    user.password = req.body.password;
                    user.accountNumber = req.body.accountNumber;
                    user.income = new Income();

                    await this.userService.adduser(user);
                    this.createUserSession(req, user, res);
                } catch (error) {
                    content.errors = [error.message];
                }
            }else{
                content.errors = this.formatErrors(vResult.array());
            }
        }
        return this.sendResponse(req, res,'account/register', content);
    }

    private createUserSession(req: Request, user: User, res: Response) {
        req.session.user = user.id;
        req.session.save((err) => {
            if (!err) {
                res.redirect('/');
            }
        });
    }

    validateLogin = () => {
        return [
            check("username", "Le nom d'utilisateur est requis.").not().isEmpty()
        ]
    };

    validateRegister = () => {
        return [
            check("username", "Le username est requis.").not().isEmpty(),
            check("role", "Le rôle est requis.").not().isEmpty(),
            check("password", "Le mot de passe est requis.").not().isEmpty(),
            check("accountNumber", "Le numéro de compte est requis.").not().isEmpty().isNumeric()
        ]
    }
}