import { AppError } from "./AppError";

export class BadRequestError extends AppError {
  constructor(messageKey = "errors.bad_request", meta?: any) {
    super(messageKey, 400, meta);
  }
}
