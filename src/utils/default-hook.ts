import type { Hook } from "@hono/zod-openapi";
import { UNPROCESSABLE_ENTITY } from "./http-status-codes";
import type { Context } from "hono";

export default function defaultHook(
  result: any,
  ctx: Context,
): ReturnType<Hook<any, any, any, any>> {
  if (!result.success) {
    return ctx.json(
      {
        success: result.success,
        error: result.error,
      },
      UNPROCESSABLE_ENTITY,
    );
  }
}
