import { EntityManager, EntityRepository, sql } from "@mikro-orm/postgresql";
import { BookBorrow } from '../mikroorm/entities/book-borrow';
import { getMikroORM } from "../mikroorm/entity-manager";
import { BookReturn } from "../mikroorm/entities/book-return";

let repository: EntityRepository<BookReturn>
let em: EntityManager;

(async () => {
    const orm = await getMikroORM();
    em = orm.em;
    repository = em.getRepository(BookReturn);
})()

const save = async (bookReturn: BookReturn) => repository.create(bookReturn)

export default {
    save
}