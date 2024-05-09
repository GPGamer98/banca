import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const Account = sqliteTable("accounts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    user: text("user").notNull(),
    money: integer("money").notNull()
})