import { NextFunction, Request, Response } from 'express';
import HttpError from 'managers/responses/http-error';
import HandledResponse from 'managers/responses/response';
import { Schema } from 'yup';

export default class BaseDto {
  protected runValidation = (callback: (req: Request) => object) => {
    const schema = this['schema' as keyof BaseDto] as Schema;
    return async (req: Request, res: Response, next: NextFunction) => {
      const { error } = await schema.validate(callback(req));
      if (error) {
        const errorStatus = 400;
        HandledResponse.run({
          message: error.message,
          status: errorStatus,
          response: res,
          request: req,
          error: new HttpError(errorStatus, error.message),
        });
      }
      next();
    };
  };
}
