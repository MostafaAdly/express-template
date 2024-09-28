export default class HttpError extends Error {
  public status: number = 500;
  public message: string;
  public errorName: string | undefined;

  constructor(status: number, message: string, errorName?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.errorName = errorName;
  }

  static isHttpError(error: Error): error is HttpError {
    return error instanceof HttpError;
  }
}
