import cors, { CorsOptions } from "cors";
import express from "express";
import {
  collectDefaultMetrics,
  httpRequestCounter,
  register,
} from "@utils/metrics";
import { requestLogger } from "@middlewares/requestLogger";
import productRouter from "@routes/product.routes";
import i18n from "i18n";
import path from "path";
import { requestFormatter } from "@middlewares/requestFormatter";
import { errorHandler } from "@middlewares/errorHandler";
import { ENV } from "@config/env";

const app = express();

/**
 * CORS options
 */
const corsOptions: CorsOptions = {
  origin:
    ENV.NODE_ENV === "production"
      ? ["https://your-production-domain.com"]
      : ["http://localhost:3000"], // Frontend dev server
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

/**
 * Internationalization implementation
 */
i18n.configure({
  locales: ['en', 'fr', 'es'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  objectNotation: true,
  autoReload: true,
  updateFiles: false,
  syncFiles: false,
});
app.use(i18n.init);

/**
 * Logging Middleware
 */
app.use(requestLogger);

/**
 * Collect default system metrics
 */
collectDefaultMetrics();

/**
 * Prometheus Middleware to track metrics
 */
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });
  });
  next();
});

/**
 * Request formatter
 */
app.use(requestFormatter);

app.use("/product", productRouter);
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: `${ENV.SERVICE_NAME} is up and running`,
  });
});

/**
 * Prometheus Metrics endpoint
 */
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use(errorHandler);

export default app;
