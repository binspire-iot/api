import env from "./config/env";
import server from "./lib/server";
import { serve } from "@hono/node-server";

serve({
  fetch: server.fetch,
  port: env.PORT,
});
