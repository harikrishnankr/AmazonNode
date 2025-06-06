import client from "prom-client";

export const collectDefaultMetrics = client.collectDefaultMetrics;
export const register = client.register;

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
