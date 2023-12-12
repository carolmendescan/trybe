import * as jwt from 'jsonwebtoken';
import { IUser } from '../Interfaces/user';

export default class JwtUtils {
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  sign(payload: string | object): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  decodeToken(token: string): Partial<IUser> {
    const splitToken = token.split(' ');
    return jwt.verify(splitToken[1], this.jwtSecret) as Partial<IUser>;
  }
}
