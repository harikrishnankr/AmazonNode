import { NextFunction, Request, Response } from "express";
import { AppError } from "@utils/errors/AppError";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const messageKey = err instanceof AppError ? err.messageKey : 'errors.internal';
  const meta = err instanceof AppError ? err.meta : undefined;

  res.status(statusCode).json({
    success: false,
    message: res.__(messageKey),
    error: process.env.NODE_ENV === 'development' ? meta || err.stack : undefined,
  });
};
