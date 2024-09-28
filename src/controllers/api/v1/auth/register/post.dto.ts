import BaseDto from 'managers/dtos/base.dto';
import Dto from 'managers/dtos/dto.interface';
import * as Yup from 'yup';

const schemaObject = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  username: Yup.string().required(),
  first_name: Yup.string().required(),
  last_name: Yup.string().required(),
});

export type SchemaType = Yup.InferType<typeof schemaObject>;

export default class Validator extends BaseDto implements Dto {
  public schema = schemaObject;

  public validate = this.runValidation((req) => req.body);
}
