import { BookReturn } from "../entities/book-return";
import { DataSource, Repository } from "typeorm";

let repository: Repository<BookReturn>;

export const constructBookReturnsRepository = (ds: DataSource) => {
    repository = ds.getRepository(BookReturn);
}

export const getBookReturnsRepository = () => repository;
