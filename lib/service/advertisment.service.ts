import { UserRepo } from "../DB/repo/user.repo";
import { ClientRepo } from "../DB/repo/client.repo";
import { Client } from "../DB/entity/client.entity";
import { User } from "../DB/entity/user.entitiy";
import { TokenService } from "./token.service";
var sha1 = require('sha1');

export class AdvertismentService {
    public generateAnalyticToken(user: User){
        TokenService.createToken(user.id)
    }
}