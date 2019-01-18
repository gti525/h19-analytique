import { Request, Response } from 'express';
import { UserService } from '../service/user.service';
import { QueryFailedError } from 'typeorm';

export class apiController {
    private userService: UserService= new UserService();

    public async authenticate(req: Request, res: Response) {
        try{
            const id = req.body.id;
            const password =  req.body.password;
            const token = await this.userService.authenticate(id,password);
            res.json(token).status(200);
        }
        catch{
            res.status(401).json('Invalid credentials');
        }
    }

    public async addUser(req: Request, res: Response) {
        try{
            const id = req.body.id;
            const role = req.body.role;
            const password =  req.body.password;
            const user = await this.userService.adduser({id,role,password});
            user ? res.json(user).status(200) : res.status(409)
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
