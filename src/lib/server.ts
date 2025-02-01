import { Hono } from "hono";
import env from "@/config/env";
import { pinoLogger } from "@/middlewares/logger";
import log from "./pino";

function setupServer() {
  const server = new Hono();

  server.use(pinoLogger());

  server.get("/", (c) => {
    return c.text("Binspire API is running");
  });

  log.info(`Serving is running on port ${env.PORT}`);

  return server;
}

const server = setupServer();

export default server;
