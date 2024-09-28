import fs from 'fs';
import path from 'path';
import { Application } from 'express';
import Dto from 'managers/dtos/dto.interface';
import MiddlewaresManager from 'managers/middlewares/middlewares.manager';
import Helpers from 'utils/helpers';
import Logger from 'utils/logger';

import Controller from './controller';
import Handler from './handler';

export default class ControllersManager {
  private routeName = 'route.ts';
  private dtoName = 'dto.ts';
  private defaultDtoMethod = 'POST';
  public static methods = ['get', 'post', 'put', 'delete', 'patch'] as const;
  private readonly controllersPath = '/src/controllers';
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public initControllers = () => {
    const controllers = this.getControllers();
    controllers.forEach((controller) => controller.controller.init());
    Logger.log('Controllers initialized successfully, total: ' + controllers.size);
  };

  private getControllers = (): Map<string, { controller: Controller; route: Handler }> => {
    const controllers = new Map<string, { controller: Controller; route: Handler }>();
    this.findRouteFiles(this.controllersPath).forEach(async (filePath) => {
      if (!filePath.path) return;
      const relativePath = filePath.path.replace(this.controllersPath, '');
      const controllerPath = path.join(process.cwd(), filePath.path);

      const dtos = filePath.dtos.reduce(
        (acc, dto) => {
          const dtoMethod =
            dto
              .split('/')
              .pop()
              ?.replace('.' + this.dtoName, '')
              ?.toUpperCase() || this.defaultDtoMethod;
          const dtoRelativePath = path.join(process.cwd(), dto);
          const Validator = Helpers.require(dtoRelativePath).default;
          acc[dtoMethod] = new Validator();
          return acc;
        },
        {} as { [key: string]: Dto },
      );

      const route = new (Helpers.require(controllerPath).default)();
      const middlewares = MiddlewaresManager.getMiddlewares(route.middlewares, route.skipMiddlewares || []);
      const controller: Controller = new Controller(
        this.app,
        relativePath.replace(this.routeName, '').replace(/\[([^\]]+)\]/g, ':$1'),
        route,
        dtos,
        middlewares,
      );
      controllers.set(relativePath, { controller, route });
    });
    return controllers;
  };

  private findRouteFiles = (dir: string): { path: string | null; dtos: string[] }[] => {
    let results: { path: string | null; dtos: string[] }[] = [];
    const current: { path: string | null; dtos: string[] } = { path: null, dtos: [] };
    const list = fs.readdirSync(path.join(process.cwd(), dir));

    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(path.join(process.cwd(), filePath));

      if (stat && stat.isDirectory()) {
        results = results.concat(this.findRouteFiles(filePath));
      } else if (file.endsWith(this.routeName)) {
        current.path = filePath;
      } else if (file.endsWith(this.dtoName)) {
        current.dtos.push(filePath);
      }
      if (current.path) results.push(current);
    });

    return results;
  };
}
