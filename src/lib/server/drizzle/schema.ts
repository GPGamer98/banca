import { pgTable, integer, varchar, serial } from "drizzle-orm/pg-core"

export const Account = pgTable("accounts", {
    id: serial("id").primaryKey(),
    user: varchar("user", { length: 255 }).notNull(),
    money: integer("money").notNull()
})