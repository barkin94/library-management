import { DataSource, EntityRepository, Repository } from "typeorm";
import { Book } from "./book.entity";

export class BookRepository extends Repository<Book> {
  // Custom methods can be added here
  
}

