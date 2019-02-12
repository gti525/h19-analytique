import { Request, Response } from 'express';
import {UserService} from "../service/user.service";
import {QueryFailedError} from "typeorm";
import {User} from "../DB/entity/user.entitiy";
import {UserRoles} from "../models/enums/role-enums";
import { Income } from '../DB/entity/income.entitiy';

export class AccountController {

    private userService: UserService = new UserService();

    public async login(req: Request, res: Response, next) {
        try{
            const username = req.body.username;
            const password =  req.body.password;
            const token = await this.userService.authenticate(username, password);

            res.render("index");
        }
        catch{
            res.status(401).send('Invalid credentials');
        }
    }

    public async getLoginPage(req: Request, res: Response, next) {
        res.render('account/login');
    }

    public async getRegisterPage(req: Request, res: Response, next) {
        const roles = {};
        roles[UserRoles.CAMPAIGNMANAGER] = "Campaign administrator";
        roles[UserRoles.WEBSITEADMIN] = "Website administrator";
        res.render('account/register', { roles });
    }

    public async register(req: Request, res: Response, next) {
        try{
            const user = new User();
            user.username = req.body.username;
            user.role = req.body.role;
            user.password = req.body.password;
            user.income = new Income();

            await this.userService.adduser(user);

            res.render("index")
        }
        catch(error){
            if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY'){
                res.status(409).json(error.message);
            }
            else{
                res.status(500).json(error);
            }
        }
    }
}