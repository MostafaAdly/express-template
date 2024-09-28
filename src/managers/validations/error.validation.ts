import ValidationManager from './validation.manager';

export default class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    ValidationManager.isValid = false;
  }

  static isValidationError(error: Error): error is ValidationError {
    return error.name === 'ValidationError';
  }
}
