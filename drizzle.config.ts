import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/lib/server/drizzle/schema.ts",
    out: "./src/lib/server/drizzle/migrations",
    driver: "better-sqlite",
    verbose: true,
    strict: true
})