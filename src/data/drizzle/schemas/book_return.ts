import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { bookBorrowsTable } from "./book_borrow";
import { relations } from "drizzle-orm";
import { baseEntity } from "./base-entity";

export const bookReturnsTable = pgTable("book_returns", {
  ...baseEntity,
  returnedAt: date().notNull(),
  rating: integer().notNull(),
  bookBorrowId: integer().notNull().references(() => bookBorrowsTable.id)
});

export const bookReturnsRelations = relations(bookReturnsTable, ({ one }) => ({
  bookBorrow: one(bookBorrowsTable, {
    fields: [bookReturnsTable.bookBorrowId],
    references: [bookBorrowsTable.id]
  })
}))
