import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
  constructor(messageKey = "errors.forbidden", meta?: any) {
    super(messageKey, 403, meta);
  }
}
