import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

export interface ServerBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type ServerOpenAPI = OpenAPIHono<ServerBindings>;

export type ServerRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  ServerBindings
>;
