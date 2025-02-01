import { apiReference } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json" with { type: "json" };
import type { ServerOpenAPI } from "@/utils/types";

function openAPI(app: ServerOpenAPI) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Binspire API",
    },
  });

  app.get(
    "reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/docs",
      },
    }),
  );
}

export default openAPI;
