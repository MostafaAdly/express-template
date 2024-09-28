import { NextFunction, Request, Response } from 'express';
import IMiddleware from 'managers/middlewares/middleware.interface';
import Logger from 'utils/logger';

export default class BaseMiddleware implements IMiddleware {
  public run = (req: Request, res: Response, next: NextFunction) => {
    Logger.logRequest(req, res);
    next();
  };
}
