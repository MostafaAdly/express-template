import { User } from 'database/entities/user.entity';
import { NextFunction, Request, Response } from 'express';
import MiddlewaresManager from 'managers/middlewares/middlewares.manager';
import HandledResponse from 'managers/responses/response';
import Helpers from 'utils/helpers';

export default class Handler {
  private request: Request;
  private response: Response;
  protected next: NextFunction;
  private authenticated: boolean;

  public async handle({
    handler,
    request,
    response,
    next,
  }: {
    handler: () => Promise<void>;
    request: Request;
    response: Response;
    next: NextFunction;
  }) {
    this.request = request;
    this.response = response;
    this.next = next;
    Helpers.asyncHandler(async () => {
      if (
        ((this['middlewares' as keyof Handler] as unknown as string[]) || []).includes(
          MiddlewaresManager.authenticationMiddleware,
        )
      )
        this.authenticated = true;
      await handler();
    })(next);
  }

  protected get currentUser(): User | undefined {
    return this.authenticated && this.request.user ? (this.request.user as User) : undefined;
  }

  protected sendResponse = ({
    data,
    message,
    status = 200,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    message: string;
    status?: number;
  }) => {
    HandledResponse.run({
      data,
      message,
      status,
      response: this.response,
      request: this.request,
    });
  };

  protected getRequest = <T>(): Omit<Request, 'body'> & { body: T } =>
    this.request as Omit<Request, 'body'> & { body: T };
  protected getResponse = (): Response => this.response as Response;
}
