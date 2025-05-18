import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {
  constructor(messageKey = "errors.unauthorized", meta?: any) {
    super(messageKey, 401, meta);
  }
}
