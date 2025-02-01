import type { Context, NotFoundHandler } from "hono";
import { NOT_FOUND } from "@/utils/http-status-codes";
import { NOT_FOUND as NOT_FOUND_MESSAGE } from "@/utils/http-status-phrases";

function notFound(ctx: Context): ReturnType<NotFoundHandler> {
  return ctx.json(
    {
      message: `${NOT_FOUND_MESSAGE} - ${ctx.req.path}`,
    },
    NOT_FOUND,
  );
}

export default notFound;
