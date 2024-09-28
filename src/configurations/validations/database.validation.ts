import BaseValidation from 'managers/validations/base.validation';
import IValidation from 'managers/validations/interface.validation';
import Helpers from 'utils/helpers';
import * as Yup from 'yup';

import config from '../../../database.config.json';

export default class DatabaseValidation extends BaseValidation implements IValidation {
  schema: Yup.Schema = Yup.object().shape({
    host: Yup.string().required(),
    port: Yup.number().required(),
    username: Yup.string().required(),
    password: Yup.string().required(),
    database: Yup.string().required(),
  });

  run = async (): Promise<void> => {
    await this.validate(config[Helpers.ENVIRONMENT] || {}, this.schema);
  };
}
