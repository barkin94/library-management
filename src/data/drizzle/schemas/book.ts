import { pgTable, varchar } from "drizzle-orm/pg-core";
import { baseEntity } from "./base-entity";
import { relations } from "drizzle-orm";
import { bookBorrowsTable } from "./book_borrow";

export const booksTable = pgTable("books", {
  ...baseEntity,
  //id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const booksTableRelations = relations(booksTable, ({ many }) => ({
  borrows: many(bookBorrowsTable)
}))
