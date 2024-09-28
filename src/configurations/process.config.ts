import ValidationError from 'managers/validations/error.validation';
import Logger from 'utils/logger';

process.on('uncaughtException', (error) => {
  Logger.error('Uncaught Exception:', error.message);
});

process.on('unhandledRejection', (reason: Error) => {
  const isValidationError = ValidationError.isValidationError(reason);
  const message = isValidationError
    ? 'Validation error: {error-reason}'
    : 'Unhandled Rejection type: {error-name}, reason: {error-reason}';
  Logger.error(message.replace('{error-name}', reason.name).replace('{error-reason}', reason.message));
});
