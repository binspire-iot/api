import { pinoLogger as logger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";
import env from "@/config/env";
import { nanoid } from "nanoid";

export function pinoLogger() {
  return logger({
    pino: pino(
      {
        level: env.LOG_LEVEL || "info",
      },
      env.NODE_ENV === "production" ? undefined : pretty(),
    ),
    http: {
      reqId: () => nanoid(),
    },
  });
}
