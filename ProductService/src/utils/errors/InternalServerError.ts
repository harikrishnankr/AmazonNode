import { AppError } from "./AppError";

export class InternalServerError extends AppError {
  constructor(messageKey = "errors.internal", meta?: any) {
    super(messageKey, 500, meta);
  }
}
