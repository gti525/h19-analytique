import { User } from "../DB/entity/user.entitiy";
import { UserRepo } from "../DB/repo/user.repo";
import { UserRoles } from "../models/enums/role-enums";
var sha1 = require('sha1');


export class InitService {
    private static users = ['admin','antoine','webadmin'];
    public static async initDB() : Promise<void> {
        this.users.forEach(async (u) => {
            if (!(await UserRepo.findByUsername(u))){

                const user = new User();
                user.password = sha1("test1234");
                user.role = UserRoles.ADMIN;
                user.username = u;
                if (u === 'webadmin'){
                    user.analyticToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpYXQiOjE1NDg4MTQ4MTF9.Lnx1ENTHmzfBkNsDFs-zFsAK86cgKqH0_Fw8R5VEqlk";
                    user.role = UserRoles.WEBSITEADMIN;
                }
                UserRepo.create(user);
            }
        })
    }
}