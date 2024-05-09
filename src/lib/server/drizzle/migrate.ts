import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');

async function main() {
    await migrate(drizzle(sqlite), { migrationsFolder: 'src/lib/server/drizzle/migrations' });

    sqlite.close();
};

main()