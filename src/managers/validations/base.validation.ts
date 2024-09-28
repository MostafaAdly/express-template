import { Schema, ValidationError } from 'yup';

export default class BaseValidation {
  validate = async (data: unknown, schema: Schema) => {
    const { error } = await schema.validate(data);
    if (error) throw new ValidationError(error.message);
  };
}
