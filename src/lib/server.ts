import { pinoLogger } from "@/middlewares/logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { ServerBindings } from "@/utils/types";
import openAPI from "./open-api";
import log from "./pino";
import env from "@/config/env";
import notFound from "@/handlers/not-found";
import onError from "@/handlers/on-error";
import defaultHook from "@/utils/default-hook";
import { index } from "@/modules/index/index.route";

export function createRouter() {
  return new OpenAPIHono<ServerBindings>({
    strict: false,
    defaultHook,
  });
}

export function createServer(port: number | undefined = env.PORT) {
  if (!port) {
    throw new Error("Port is not provided");
  }

  const server = createRouter();

  server.use(pinoLogger());

  server.notFound(notFound);
  server.onError(onError);

  log.info(`API is running on port ${port}`);

  return server;
}

const server = createServer();

openAPI(server);

const routes = [index];

routes.forEach((route) => {
  server.route("/", route);
});

export type ServerType = (typeof routes)[number];

export default server;
