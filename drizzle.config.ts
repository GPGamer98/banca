import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/lib/server/drizzle/schema.ts",
    out: "./src/lib/server/drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string
    },
    verbose: true,
    strict: true
})