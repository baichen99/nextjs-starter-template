import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";
import { env } from "@/env/server";

export const client = postgres(env.DATABASE_URL, {
  max: env.DATABASE_MIGRATING ? 1 : undefined,
});
const db = drizzle(client, { schema });

export default db;
