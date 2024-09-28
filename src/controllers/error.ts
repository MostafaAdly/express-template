import { NextFunction, Request, Response } from 'express';
import HttpError from 'managers/responses/http-error';
import HandledResponse from 'managers/responses/response';
import Logger from 'utils/logger';

export default class ErrorController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public index = (error: HttpError, req: Request, res: Response, next: NextFunction) => {
    Logger.errorRequest(req, res);
    HandledResponse.run({
      message: error.message,
      status: error.status || 400,
      error,
      response: res,
      request: req,
    });
  };
}
