import Logger from 'utils/logger';

import { AppDataSource } from './typeorm.config';

export default class Database {
  public start = async (): Promise<boolean> => {
    try {
      await this.createConnection();
      this.onConnectionSuccess();
      return true;
    } catch (error) {
      this.onConnectionError(error as Error);
      return false;
    }
  };

  private createConnection = async () => {
    await AppDataSource.initialize();
  };

  private onConnectionSuccess = () => {
    Logger.success('Database connection initialized successfully');
  };

  private onConnectionError = (error: Error) => {
    Logger.error(error.message);
  };
}
