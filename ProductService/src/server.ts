import app from "./app";
import { ENV } from "./config/env";

const startServer = () => {
  app.listen(ENV.PORT, () => {
    console.log(`${ENV.SERVICE_NAME} is up and running on port: ${ENV.PORT}...`);
  });
};

startServer();
