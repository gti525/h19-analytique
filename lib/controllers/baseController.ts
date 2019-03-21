import { User } from "../DB/entity/user.entitiy";
import { UserService } from "../service/user.service";
import { Request, Response } from 'express';

export class BaseController{
    protected async getUser(req: Request): Promise<User> {
        const userService = new UserService();
        if(req.headers && req.headers['x-access-token'])
            return await userService.findByToken(req.headers['x-access-token']);
        if(req.session && req.session.user)
            return await userService.findById(req.session.user);
        return undefined
    }

    protected async sendResponse(req, res: Response,path: string, content: any = {}) {
        const user = await this.getUser(req);
        if(user){
            content['name'] = user.username;
            content['role'] = user.role;
            content['successes'] = req.flash('successes');
        }
        res.render(path,content);
    }

    protected formatErrors(errors: any): string[]{
        return errors.map(e => e.msg).filter((e, i, a) => i === a.indexOf(e));
    }
}