import type { Context, ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { INTERNAL_SERVER_ERROR, OK } from "@/utils/http-status-codes";

export default function onError(
  err: any,
  ctx: Context,
): ReturnType<ErrorHandler> {
  const current_status =
    "status" in err ? err.status : ctx.newResponse(null).status;

  const status_code =
    current_status !== OK
      ? (current_status as ContentfulStatusCode)
      : INTERNAL_SERVER_ERROR;

  /* eslint-disable node/no-process-env */
  const env = ctx.env.NODE_ENV || process.env.NODE_ENV;

  return ctx.json(
    {
      message: err.message,
      stack: env === "production" ? undefined : err.stack,
    },
    status_code,
  );
}
