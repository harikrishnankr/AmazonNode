import { AppError } from "./AppError";

export class ApiError extends AppError {
  constructor(
    messageKey: string = "errors.internal",
    statusCode: number = 400,
    meta?: any
  ) {
    super(messageKey, statusCode, meta);
  }
}
