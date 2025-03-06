import { getDb } from "../drizzle";
import { bookBorrowsTable } from "../drizzle/schemas/book_borrow";
import { booksTable } from "../drizzle/schemas/book";
import { and, eq, isNull } from "drizzle-orm";
import { usersTable } from "../drizzle/schemas/user";
import { bookReturnsTable } from "../drizzle/schemas/book_return";

const db = getDb();

const findOneByUserIdAndBookIdWhereBookReturnIsNull = async (userId: number, bookId: number) => {
    const result = await db
        .select().from(bookBorrowsTable)
        .innerJoin(booksTable, eq(bookBorrowsTable.bookId, booksTable.id))
        .innerJoin(usersTable, eq(bookBorrowsTable.userId, usersTable.id))
        .leftJoin(bookReturnsTable, eq(bookBorrowsTable.id, bookReturnsTable.bookBorrowId))
        .where(
            and(
                eq(booksTable.id, bookId),
                eq(usersTable.id, userId), 
                isNull(bookReturnsTable.bookBorrowId), 
            )
        )
        .execute();

    return result[0];
}

const create = (params: { userId: number, bookId: number }) => {
    return db.insert(bookBorrowsTable).values(params);
}

export default {
    findOneByUserIdAndBookIdWhereBookReturnIsNull,
    create
}