import { drizzle } from "drizzle-orm/postgres-js";
import env from "@/config/env";
import * as schema from "./schema/index";
import postgres from "postgres";

function setupDb(url: string | undefined = env.DATABASE_URL) {
  if (!url) {
    throw new Error("URL is not provided");
  }

  const client = postgres(url);

  return drizzle(client, { schema });
}

const db = setupDb();

export default db;
