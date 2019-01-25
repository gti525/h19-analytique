import { Request, Response } from 'express';
import {UserService} from "../service/user.service";
import {QueryFailedError} from "typeorm";
import {User} from "../DB/entity/user.entitiy";
import {UserRoles} from "../models/enums/role-enums";

export class AccountController {

    private userService: UserService = new UserService();

    public async login(req: Request, res: Response, next) {

        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }

        if(req.method == 'GET')
            res.render('account/login');
        else{
            try{
                const username = req.body.username;
                const password =  req.body.password;
                const token = await this.userService.authenticate(username, password);
                res.json(token).status(200);
            }
            catch{
                res.status(401).send('Invalid credentials');
            }
        }
    }

    public async register(req: Request, res: Response, next) {
        if (req.method !== 'GET' && req.method !== 'POST') {
            return next()
        }
        console.log(UserRoles);
        if(req.method == 'GET')
            res.render('account/register', { roles: UserRoles });
        else{
            try{
                const user = new User();
                user.username = req.body.username;
                user.role = req.body.role;
                user.password = req.body.password;

                const result = await this.userService.adduser(user);

                result ? res.json(result).status(200) : res.status(409)
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
}