import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (data: any, message?: string) => void;
      error: (message: string, errorCode: number, errorData?: any) => void;
    }
  }
}

export function requestFormatter(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.success = (data: any, message: string = "Success") => {
    res.status(200).json({
      success: true,
      message: res.__(message),
      data,
    });
  };

  res.error = (message, errorCode = 500, errorData = null) => {
    res.status(errorCode).json({
      success: false,
      message: res.__(message),
      error: errorData,
    });
  };

  next();
}
