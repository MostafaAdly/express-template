import { NextFunction, Request, Response } from 'express';
import IMiddleware from 'managers/middlewares/middleware.interface';
import HttpError from 'managers/responses/http-error';
import JwtService from 'services/jwt.service';
import UsersService from 'services/users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: unknown;
    }
  }
}

export default class AuthMiddleware implements IMiddleware {
  public run = async (req: Request, res: Response, next: NextFunction) => {
    if (!req) throw new HttpError(400, 'Request is not defined');
    if (!req.headers['authorization']) throw new HttpError(400, 'Authorization header is not defined');
    const token = req?.headers['authorization']?.split(' ')[1];
    if (!token) throw new HttpError(400, 'Token is not defined');
    const { id: userId } = JwtService.verifyToken(token);
    if (!userId) throw new HttpError(400, 'User id is not defined');
    const user = await UsersService.getUserById(userId);
    if (!user) throw new HttpError(404, 'User not found');
    req.user = user;
    next();
  };
}
