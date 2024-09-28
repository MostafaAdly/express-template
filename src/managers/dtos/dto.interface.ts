import { NextFunction, Request, Response } from 'express';
import { Schema } from 'yup';

export default interface Dto {
  schema: Schema;
  validate: (req: Request, res: Response, next: NextFunction) => void;
}
