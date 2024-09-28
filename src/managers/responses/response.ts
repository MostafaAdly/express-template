/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response as ExpressResponse, Request } from 'express';

import HttpError from './http-error';

type ResponseType = {
  message: string;
  status: number;
  error?: boolean;
  path?: string;
  method?: string;
  timestamp?: string;
  data?: any;
};

export default class Response {
  private static defaultMessage = 'Internal server error';
  private static defaultStatus = 500;

  public static run = ({
    data,
    error,
    message,
    status,
    response,
    request,
  }: {
    data?: any;
    error?: HttpError;
    response?: ExpressResponse;
    request?: Request;
    message: string;
    status: number;
  }) => {
    const responseStatus = error?.status || status || this.defaultStatus;
    const result: ResponseType = {
      message: error?.message || message || this.defaultMessage,
      status: responseStatus,
      error: !!error || undefined,
      path: request?.path,
      method: request?.method,
      timestamp: new Date().toISOString(),
      data,
    };
    return response ? response.status(responseStatus).json(result) : result;
  };
}
