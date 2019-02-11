import * as  jwt from 'jsonwebtoken';
var secret =  'JFEAN9832u42348329048234FJNJKfjkjdlkf92349032'; // TODO mettre ca dans la config
export class TokenService {
    // TODO set enum not string
    public static createToken(id: number) {
        return jwt.sign({
            id
          }, secret);
    }

    public static decodeToken(token: string): any
    {
        try{
            return jwt.verify(token,secret);
        } catch {
            console.log('Token was not valid')
            return undefined;
        }
    }

    public static isTokenValid(token: string)
    {
        return TokenService.decodeToken(token) !== undefined;
    }
}