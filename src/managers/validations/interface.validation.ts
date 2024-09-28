import { Schema } from 'yup';

export default interface IValidation {
  schema: Schema;
  run(): Promise<void>;
}
