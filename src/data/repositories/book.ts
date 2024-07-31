import { Book } from "../entities/book";
import { DataSource, Repository } from "typeorm";

let repository: Repository<Book>;

export const constructBookRepository = (dataSource: DataSource) => {
    repository = dataSource.getRepository(Book)
}

export const getBooksRepository = () => repository;

