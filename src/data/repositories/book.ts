import { EntityManager, EntityRepository, sql } from "@mikro-orm/postgresql";
import { Book } from '../mikroorm/entities/book';
import { getMikroORM } from "../mikroorm/entity-manager";

let repository: EntityRepository<Book>
let em: EntityManager;

(async () => {
  const orm = await getMikroORM();
  em = orm.em;
  repository = em.getRepository(Book);
})()

const getBookByIdWithAverageScore = async (bookId: string) =>  {

  // repository.findOne(bookId, {
  //   populate: ['borrows']
  // })
  // repository
  //   .createQueryBuilder('book')
  //   .leftJoin('book.borrows', 'borrow')
  //   .where({ 'book.id': bookId })
  //   .groupBy('book.id')    
  //   .execute<{ id: string, name: string, score: number }>();

  const asd = await em.qb(Book, 'book')
    .select([
      'AVG(borrow.rating) AS score',
      'book.id AS id',
      'book.name AS name'
    ])
    .leftJoin('book.borrows', 'borrow')
    .where({ 'book.id': bookId })
    .groupBy('book.id')
    .execute<{ id: string, name: string, score: number }>('all')
  //asd.execute()

  return asd;
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
  return repository.findAll();
}

const createBook = (name: string) => {
  const book = new Book();
  book.name = name;
  return repository.create(book);
}

const findOneByIdWhereBookReturnIsNull = (bookId: string) =>
  repository.findOne(
    {
      id: bookId,
      borrows: {
        bookReturn: { $exists: false }
      }
    },
    {
      populate: ['borrows', 'borrows.bookReturn']
    }
  );
 

export default {
 getBookByIdWithAverageScore,
 findAll,
 findOneByIdWhereBookReturnIsNull,
 createBook
}
