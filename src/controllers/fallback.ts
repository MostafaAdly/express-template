import { Request, Response } from 'express';
import HttpError from 'managers/responses/http-error';
import HandledResponse from 'managers/responses/response';
import Logger from 'utils/logger';

export default class FallbackController {
  public index = (req: Request, res: Response) => {
    const message = 'Fallback route';
    Logger.error(message, req.path);
    const error = new HttpError(404, message);
    HandledResponse.run({
      message: error.message,
      status: error.status,
      error,
      response: res,
      request: req,
    });
  };
}
