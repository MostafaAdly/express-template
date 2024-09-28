import path from 'path';
import Helpers from 'utils/helpers';

import IMiddleware from './middleware.interface';

export default class MiddlewaresManager {
  public static authenticationMiddleware = 'auth';
  private static middlewareName = '.middleware.ts';
  private static middlewares: { [key: string]: IMiddleware } = {};
  private static defaultMiddlewares: string[] = ['cache', 'base'];

  private static getMiddlewareByName = (name: string) => {
    if (this.middlewares[name]) return this.middlewares[name];
    const middleware = Helpers.require(path.join(process.cwd(), 'src/middlewares', name + this.middlewareName));
    const instance = new middleware.default();
    this.middlewares[name] = instance;
    return instance;
  };

  static getMiddlewares = (middlewares: string[] = [], skipMiddlewares: string[] = []) => {
    return [...this.defaultMiddlewares, ...middlewares]
      .filter((middleware) => !skipMiddlewares.includes(middleware))
      .map((middleware) => this.getMiddlewareByName(middleware));
  };
}
