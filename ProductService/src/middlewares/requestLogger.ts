import { Request, Response, NextFunction } from "express";
import logger from "@utils/logger";
import { ENV } from "@config/env";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const { method, originalUrl, headers, body: requestBody } = req;

  // Capture response data
  let responseBody = "";
  const oldSend = res.send;

  res.send = function (body: any): Response {
    responseBody = body;
    return oldSend.call(this, body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (originalUrl !== "/metrics" && ENV.NODE_ENV === "production") {
      logger.info({
        timestamp: new Date().toISOString(),
        level: "info",
        message: "HTTP Request",
        method,
        url: originalUrl,
        statusCode: res.statusCode,
        duration,
        request: {
          headers,
          body: requestBody,
        },
        response: {
          body: responseBody,
        },
        userAgent: headers["user-agent"],
        ip: req.ip,
      });
    }
  });

  next();
};
