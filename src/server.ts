import ErrorController from 'controllers/error';
import FallbackController from 'controllers/fallback';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import ControllersManager from 'managers/controllers/controllers.manager';
import Helpers from 'utils/helpers';
import Logger from 'utils/logger';

export default class Server {
  private app: Application = express();
  private port: number = Helpers.env.PORT;

  public start = () => {
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeFallbackController();
    this.initializeErrorHandling();
    this.listen();
  };

  private initializeMiddlewares = () => {
    this.app
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(cors())
      .use(helmet());
    Logger.log('Middlewares initialized successfully');
  };

  private initializeControllers = () => {
    new ControllersManager(this.app).initControllers();
  };

  private initializeFallbackController = () => {
    this.app.all('*', new FallbackController().index);
  };

  private initializeErrorHandling = () => {
    this.app.use(new ErrorController().index);
    Logger.log('Error handling initialized successfully');
  };

  private listen = () => this.app.listen(this.port, () => Logger.success(`Server is running on port ${this.port}`));
}
