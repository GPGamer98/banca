import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import Database from "better-sqlite3";

const client = new Database('src/lib/server/drizzle/db/sqlite.db');
export const db = drizzle(client, { schema, logger: true });
