import BaseValidation from 'managers/validations/base.validation';
import IValidation from 'managers/validations/interface.validation';
import * as Yup from 'yup';

export default class EnvVarsValidation extends BaseValidation implements IValidation {
  schema = Yup.object().shape({
    NODE_ENV: Yup.string()
      .required()
      .oneOf(['development', 'production'] as const),
    PORT: Yup.number().required().min(1024).max(65535),
    JWT_SECRET: Yup.string().required().notOneOf(['your_jwt_secret']).min(32),
  });

  run = async (): Promise<void> => {
    await this.validate(process.env, this.schema);
  };
}
