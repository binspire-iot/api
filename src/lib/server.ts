import { Hono } from "hono";
import env from "@/config/env";
import { pinoLogger } from "@/middlewares/logger";

function setupServer() {
  const server = new Hono();

  server.use(pinoLogger());

  server.get("/", (c) => {
    return c.text(`API is running on port ${env.PORT}`);
  });

  return server;
}

const server = setupServer();

export default server;
