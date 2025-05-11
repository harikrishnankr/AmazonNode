import app from "./app";
import { ENV } from "./config/env";
import logger from "./utils/logger";

const startServer = () => {
  app.listen(ENV.PORT, () => {
    logger.info(`${ENV.SERVICE_NAME} is up and running on port: ${ENV.PORT}`);
  });
};

startServer();
