import { and, avg, eq, exists, isNull, not } from "drizzle-orm";
import { getDb } from "../drizzle";
import { bookBorrowsTable, bookReturnsTable, booksTable } from "../drizzle/schemas";

const db = getDb();

const getBookByIdWithAverageScore = async (bookId: number) =>  {
  const queryResult = await db
    .select({
      score: avg(bookReturnsTable.rating).mapWith(Number),
      name: booksTable.name,
      id: booksTable.id
    })
    .from(booksTable)
    .leftJoin(bookBorrowsTable, eq(booksTable.id, bookBorrowsTable.bookId))
    .innerJoin(bookReturnsTable, eq(bookBorrowsTable.id, bookReturnsTable.bookBorrowId))
    .where(eq(booksTable.id, bookId))
    .groupBy(booksTable.id)
    .execute()

  return queryResult[0]
  // await bookRepository
  //   .createQueryBuilder('book')
  //   .leftJoin('book.borrows', 'borrow')
  //   .where('book.id = :bookId', { bookId })
  //   .groupBy('book.id')
  //   .select('book.id', 'id')
  //   .addSelect('book.name', 'name')
  //   .addSelect('AVG(borrow.rating)', 'score')
  //   .getRawOne<{ id: string, name: string, score: number }>();
}

const findAll = () => {
  return db.query.booksTable.findMany();
}

const createBook = (name: string) => {
  return db.insert(booksTable).values({ name });
}

const findOneByIdWhereBookReturnIsNull = (bookId: number) =>
  db.query.booksTable.findFirst({
    with: {
      borrows: {
        with: {
          book: true,
          bookReturn: true
        }
      }
    },
    where:
      and(
        eq(booksTable.id, bookId),
        isNull(booksTable)
      ),
  })
  // repository.findOne(
  //   {
  //     id: bookId,
  //     borrows: {
  //       bookReturn: { $exists: false }
  //     }
  //   },
  //   {
  //     populate: ['borrows', 'borrows.bookReturn']
  //   }
  // );
 

export default {
 getBookByIdWithAverageScore,
 findAll,
 findOneByIdWhereBookReturnIsNull,
 createBook
}
