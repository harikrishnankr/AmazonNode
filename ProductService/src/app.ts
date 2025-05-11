import cors, { CorsOptions } from "cors";
import express from "express";
import { ENV } from "./config/env";
import {
  collectDefaultMetrics,
  httpRequestCounter,
  register,
} from "./utils/metrics";
import { requestLogger } from "./middlewares/requestLogger";
import productRouter from "./routes/product.routes";

const app = express();

// CORS options
const corsOptions: CorsOptions = {
  origin:
    ENV.NODE_ENV === "production"
      ? ["https://your-production-domain.com"]
      : ["http://localhost:3000"], // Frontend dev server
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// Collect default system metrics
collectDefaultMetrics();

// Prometheus Middleware to track metrics
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

app.use("/product", productRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: `${ENV.SERVICE_NAME} is up and running`,
  });
});

// Prometheus Metrics endpoint
app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

export default app;
