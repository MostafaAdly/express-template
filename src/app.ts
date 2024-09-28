import Database from 'database/database';
import ValidationManager from 'managers/validations/validation.manager';
import Server from 'server';
import Logger from 'utils/logger';

export default class App {
  public static start = async (logging: boolean = true) => {
    // Start logging
    new Logger().startLoggingInterval(logging);
    // Mount validations
    await this.mountValidations();
    // Mount database
    const database = await this.mountDatabase();
    if (!database) return Logger.error('Database connection failed');
    // Start server
    new Server().start();
  };

  private static mountValidations = async (): Promise<void> => {
    Logger.log('Mounting validations...');
    await ValidationManager.runValidations();
    if (!ValidationManager.isValid) {
      Logger.error('Configuration validation failed');
      process.exit(1);
    }
    Logger.success('Configuration validation passed');
  };

  private static mountDatabase = async (): Promise<boolean> => {
    Logger.log('Mounting database...');
    return await new Database().start();
  };
}
