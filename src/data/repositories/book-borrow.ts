import { EntityManager, EntityRepository, sql } from "@mikro-orm/postgresql";
import { BookBorrow } from '../mikroorm/entities/book-borrow';
import { getMikroORM } from "../mikroorm/entity-manager";

let repository: EntityRepository<BookBorrow>
let em: EntityManager;

(async () => {
    const orm = await getMikroORM();
    em = orm.em;
    repository = em.getRepository(BookBorrow);
})()

const findOneByUserIdAndBookIdWhereBookReturnIsNull = async (userId: string, bookId: string) => {
    return repository.findOne(
        {
            book: { id: bookId },
            user: { id: userId },
            bookReturn: { $exists: false }
        },
        {
            populate: ['book', 'user', 'bookReturn']
        })
}

const save = async (bookReturn: BookBorrow) => em.persistAndFlush(bookReturn)

export default {
    findOneByUserIdAndBookIdWhereBookReturnIsNull,
    save
}