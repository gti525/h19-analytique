import * as  jwt from 'jsonwebtoken';
import { UserService } from './user.service';
var secret =  'JFEAN9832u42348329048234FJNJKfjkjdlkf92349032';
export class TokenService {
    private static instance: TokenService;
    private constructor() {
        
    }
    public createToken(id: number) {
        return jwt.sign({
            id
          }, secret);
    }

    static getInstance() {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService();
        }
        return TokenService.instance;
    }

    public decodeToken(token): any
    {
        try{
            return jwt.verify(token,secret);
        } catch {
            return undefined;
        }
    }

    public async isTokenValid(token):Promise<boolean>
    {
        const decoded = this.decodeToken(token);
        if (decoded !== undefined){
            const userService = new UserService();
            return await userService.userExists(decoded.id);
        }
        return false;
    }
}