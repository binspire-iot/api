import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import env from "@/config/env";
import * as schema from "./schema/index.ts";

const client = postgres(env.DATABASE_URL!);
const db = drizzle({ client, schema });

export default db;
