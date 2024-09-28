import { createRequire } from 'module';
import EnvVarsValidation from 'configurations/validations/env.validation';
import { NextFunction, Request, Response } from 'express';
import { Environment } from 'types';
import * as Yup from 'yup';

export default class Helpers {
  private static envValidation = new EnvVarsValidation();
  public static env: Yup.InferType<typeof this.envValidation.schema> = process.env as unknown as Yup.InferType<
    typeof this.envValidation.schema
  >;
  public static ENVIRONMENT = (this.env.NODE_ENV || 'development') as Environment;
  public static require = createRequire(import.meta.url);

  public static isProduction = (): boolean => {
    return this.ENVIRONMENT === 'production';
  };

  public static asyncHandler = (fn: () => Promise<void>) => (next: NextFunction) => {
    Promise.resolve(fn()).catch(next);
  };

  public static asyncMiddleware = (fn: () => Promise<void>) => (next: NextFunction) => {
    Promise.resolve(fn()).catch(next);
  };

  public static asyncMiddlewareWithNext = (fn: (req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  };
}
