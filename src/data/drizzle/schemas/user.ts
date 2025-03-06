import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { bookBorrowsTable } from "./book_borrow";
import { baseEntity } from "./base-entity";

export const usersTable = pgTable("users", {
  ...baseEntity,
  name: varchar({ length: 255 }).notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  borrows: many(bookBorrowsTable)
}))
