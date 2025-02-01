import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "@/utils/http-status-codes";
import { createRouter } from "@/lib/server";
import type { Context } from "hono";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { jsonContent } from "stoker/openapi/helpers";

export const index = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Binspire API"),
        "Binspire API Index",
      ),
    },
  }),
  (ctx: Context) => {
    return ctx.json(
      {
        message: "Binspire API",
      },
      HttpStatusCodes.OK,
    );
  },
);
