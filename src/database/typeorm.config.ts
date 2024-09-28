import path from 'path';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Helpers from 'utils/helpers';

import config from '../../database.config.json';

const env = Helpers.ENVIRONMENT;

export const AppDataSource: DataSource = new DataSource({
  type: config.type as PostgresConnectionOptions['type'],
  host: config[env].host,
  port: config[env].port,
  username: config[env].username,
  password: config[env].password,
  database: config[env].database,
  synchronize: false,
  logging: false,
  entities: [path.join(process.cwd(), './src/database/entities/*.entity.ts')],
  migrations: [path.join(process.cwd(), './src/database/migrations/*.ts')],
});
