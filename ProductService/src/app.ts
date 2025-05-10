import cors, { CorsOptions } from "cors";
import express from "express";
import { ENV } from "./config/env";

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

app.get("/", (_req, res) => {
  res.status(200).json({
    status: `${ENV.SERVICE_NAME} is up and running`,
  });
});

export default app;
