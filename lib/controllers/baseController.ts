import { User } from "../DB/entity/user.entitiy";
import { UserService } from "../service/user.service";
import { Request, Response } from 'express';
import {buildCheckFunction} from "express-validator/check";

export class BaseController{
    protected errors = [];

    protected async getUser(req: Request): Promise<User> {
        const userService = new UserService();
        if(req.headers && req.headers['x-access-token'])
            return await userService.findByToken(req.headers['x-access-token']);
        if(req.session && req.session.user)
            return await userService.findById(req.session.user)
        return undefined
    }

    protected async sendResponse(req: Request, res: Response,path: string, content: any = {}) {
        const user = await this.getUser(req);
        content['name'] = user.username;
        content['role'] = user.role;
        content['errors'] = this.errors;
        res.render(path,content);
    }

    protected addErrors(errors: any){
        this.errors = errors.map(e => e.msg).filter((e, i, a) => i === a.indexOf(e));
    }
}