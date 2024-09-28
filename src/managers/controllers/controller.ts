import { Application, NextFunction, Request, Response } from 'express';
import Dto from 'managers/dtos/dto.interface';
import IMiddleware from 'managers/middlewares/middleware.interface';
import Helpers from 'utils/helpers';

import ControllersManager from './controllers.manager';
import Handler from './handler';

export default class Controller {
  private path: string;
  private route: Handler;
  private app: Application;
  private dtos: { [key: string]: Dto };
  private middlewaresAsObjects: IMiddleware[];

  constructor(
    app: Application,
    path: string,
    route: Handler,
    dtos: { [key: string]: Dto },
    middlewares: IMiddleware[],
  ) {
    this.app = app;
    this.path = path;
    this.route = route;
    this.dtos = dtos;
    this.middlewaresAsObjects = middlewares;
  }

  public init = () => {
    ControllersManager.methods
      .filter((method) => this.route[method as keyof Handler])
      .forEach((method) => {
        const dto = this.dtos[method.toUpperCase()];
        this.app[method as keyof Application](
          [this.path, ...((this.route['aliases' as keyof Handler] as unknown as string[]) || [])],
          ...this.middlewaresAsObjects.map((middleware) => Helpers.asyncMiddlewareWithNext(middleware.run)),
          dto?.validate || this.defaultDto,
          async (req: Request, res: Response, next: NextFunction) => {
            const handler = this.route[method as keyof Handler] as () => Promise<void>;
            this.route?.handle?.({ handler, request: req, response: res, next });
          },
        );
      });
  };

  private defaultDto = (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}
