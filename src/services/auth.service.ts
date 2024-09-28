import HttpError from 'managers/responses/http-error';

import BaseService from './base.service';
import JwtService from './jwt.service';
import UsersService from './users.service';

export default class AuthService extends BaseService {
  public static login = async ({ email, password }: { email: string; password: string }) => {
    const user = await UsersService.getUserByEmail(email);
    if (!user) throw new HttpError(404, 'User not found');

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) throw new HttpError(400, 'Invalid password');

    return {
      user,
      token: JwtService.generateTokenByUser(user),
    };
  };

  public static register = async (data: { email: string; password: string }) => {
    const { email, password, ...rest } = data;
    const user = await UsersService.getUserByEmail(email);
    if (user) throw new HttpError(400, 'User already exists');

    const hashedPassword = await this.hashPassword(password);

    const newUser = await UsersService.createUser({
      email,
      hashed_password: hashedPassword,
      ...rest,
    });
    return {
      user: newUser,
      token: JwtService.generateTokenByUser(newUser),
    };
  };
}
