import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(messageKey = "errors.not_found", meta?: any) {
    super(messageKey, 404, meta);
  }
}
