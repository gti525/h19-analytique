import { Request, Response } from 'express';
import {UserService} from "../service/user.service";
import {QueryFailedError} from "typeorm";
import {User} from "../DB/entity/user.entitiy";
import {UserRoles} from "../models/enums/role-enums";
import { Income } from '../DB/entity/income.entitiy';
import {check, validationResult} from "express-validator/check";
import { error } from 'util';

export class AccountController {

    private userService: UserService = new UserService();

    public async login(req: Request, res: Response, next) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const user = await this.userService.authenticate(username, password);
            this.userService.findByToken
            this.createUserSession(req, user, res);
        } catch {
            res.status(401).send('Invalid credentials');
        }
    }

    private createUserSession(req: Request, user: User, res: Response) {
        req.session.user = user.id;
        req.session.save((err) => {
            if (!err) {
                res.redirect('/');
            }
        });
    }

    public async getLoginPage(req: Request, res: Response, next) {
        res.render('account/login');
    }

    public async getRegisterPage(req: Request, res: Response, next) {
        const roles = {};
        roles[UserRoles.CAMPAIGNMANAGER] = UserRoles.CAMPAIGNMANAGER;
        roles[UserRoles.WEBSITEADMIN] = UserRoles.WEBSITEADMIN;
        res.render('account/register', {roles});
    }

    public async register(req: Request, res: Response, next) {
        let content: {[k: string]: any} = {};
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
            if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY') {
                res.status(409).json(error.message);
            } else {
                res.status(500).json(error);
            }
        }
    }
    }

    validate = () => {
        return [
            check("username", "username est réquis pour s'inscrire.").not().isEmpty().isAlphanumeric().isLength({min: 3}),
            check("role", "selectionner un role pour s'inscrire.").not().isEmpty(),
            check("password", "password est requis.").not().isEmpty(),
            check("accountNumber", "account nummber est requis.").not().isEmpty().isNumeric()
        ]
    }
}