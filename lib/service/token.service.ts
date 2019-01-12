import * as  jwt from 'jsonwebtoken';
var secret =  'secret'; // TODO mettre ca dans la config
export class TokenService {

    public static async createToken(id: number, role: string) {
        return jwt.sign({
            role,
            id
          }, secret, { expiresIn: '1h' });
    }

    public static async isTokenValide(token: string)
    {
        return jwt.verify(token,secret);

    }
}