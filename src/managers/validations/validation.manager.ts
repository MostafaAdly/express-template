import fs from 'fs';
import path from 'path';
import Helpers from 'utils/helpers';

import IValidation from './interface.validation';

export default class ValidationManager {
  public static isValid = true;
  private static validationsPath = path.join(process.cwd(), '/src/configurations/validations');

  public static runValidation(validation: IValidation) {
    return validation.run();
  }

  public static runValidations() {
    const validations = this.getValidations();
    return Promise.all(validations.map((validation) => validation.run()));
  }

  private static getValidations(): IValidation[] {
    const validations = fs.readdirSync(this.validationsPath);
    return validations
      .map((validation) => Helpers.require(path.join(this.validationsPath, validation)))
      .map((validation) => new validation.default())
      .filter(this.isValidation);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static isValidation(validation: any): validation is IValidation {
    return validation.run !== undefined;
  }
}
