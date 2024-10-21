import { migrate } from "drizzle-orm/postgres-js/migrator";

import config from "@/../drizzle.config";
import { env } from "@/env/server";

import db, { client } from "./index";

if (!env.DATABASE_MIGRATING) {
  throw new Error("DATABASE_MIGRATING must be true to run migrations");
}

await migrate(db, {
  migrationsFolder: config.out!,
});

await client.end();
