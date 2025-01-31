import { serve } from "@hono/node-server";
import { Hono } from "hono";
import env from "./config/env";
import { pinoLogger } from "./middlewares/logger";

const app = new Hono();

app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 3000;
console.log(`Api is running on http://localhost:${env.PORT}`);

serve({
  fetch: app.fetch,
  port,
});
