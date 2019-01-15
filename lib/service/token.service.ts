import * as  jwt from 'jsonwebtoken';
var secret =  'JFEAN9832u42348329048234FJNJKfjkjdlkf92349032'; // TODO mettre ca dans la config
export class TokenService {

    public static createToken(id: number, role: string) {
        return jwt.sign({
            role,
            id
          }, secret, { expiresIn: '1h' });
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