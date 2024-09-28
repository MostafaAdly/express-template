import { NextFunction, Request, Response } from 'express';

export default interface IMiddleware {
  run: (req: Request, res: Response, next: NextFunction) => void;
}
