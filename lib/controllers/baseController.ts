import { User } from "../DB/entity/user.entitiy";
import { UserService } from "../service/user.service";

export class BaseController{
    protected async getUser(req: any): Promise<User> {
        const userService = new UserService();
        if(req.session.user)
            return await userService.findById(req.session.user)
        if(req.headers['x-access-token'])
            return await userService.findByToken(req.headers['x-access-token']);
        return undefined
    }
}