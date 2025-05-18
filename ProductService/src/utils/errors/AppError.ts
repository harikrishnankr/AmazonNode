export class AppError extends Error {
  public statusCode: number;
  public messageKey: string;
  public meta?: any;

  constructor(messageKey: string, statusCode: number, meta?: any) {
    super(messageKey);
    this.statusCode = statusCode;
    this.messageKey = messageKey;
    this.meta = meta;
    Error.captureStackTrace(this, this.constructor);
  }
}
