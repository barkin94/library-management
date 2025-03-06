import { relations } from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { bookReturnsTable } from "./book_return";
import { usersTable } from "./user";
import { booksTable } from "./book";
import { baseEntity } from "./base-entity";

export const bookBorrowsTable = pgTable("book_borrows", {
  ...baseEntity,
  bookId: integer().notNull().references(() => booksTable.id),
  userId: integer().notNull().references(() => usersTable.id)
});

export const bookBorrowsRelations = relations(bookBorrowsTable, ({ one }) => ({
  bookReturn: one(bookReturnsTable, {
    fields: [bookBorrowsTable.id],
    references: [bookReturnsTable.bookBorrowId]
  }),
  user: one(usersTable, {
    fields: [bookBorrowsTable.userId],
    references: [usersTable.id]
  }),
  book: one(booksTable, {
    fields: [bookBorrowsTable.bookId],
    references: [booksTable.id]
  })
}))
