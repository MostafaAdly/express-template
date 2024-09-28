import { NextFunction, Request, Response } from 'express';
import IMiddleware from 'managers/middlewares/middleware.interface';

export default class CacheMiddleware implements IMiddleware {
  public run = async (req: Request, res: Response, next: NextFunction) => {
    const maxAge = 60; // 1 minute
    res.setHeader('Cache-Control', req.method === 'GET' ? `public, max-age=${maxAge}` : 'no-store');
    next();
  };
}
