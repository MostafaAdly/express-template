import { User } from 'database/entities/user.entity';
import jwt from 'jsonwebtoken';
import Helpers from 'utils/helpers';

import UsersService from './users.service';

export default class JwtService {
  private static jwtSecret = Helpers.env.JWT_SECRET;

  public static generateTokenByUser = (user: User) => {
    return jwt.sign(UsersService.getUserIdentityObject(user), this.jwtSecret, { expiresIn: '1h' });
  };
  public static generateToken = (payload: object) => {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  };

  public static verifyToken = (token: string) => {
    return jwt.verify(token, this.jwtSecret) as { id: string };
  };
}
