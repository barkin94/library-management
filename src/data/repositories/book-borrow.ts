import { BookBorrow } from "../entities/book-borrow";
import { DataSource, Repository } from "typeorm";

let repository: Repository<BookBorrow>;

export const constructBookBorrowsRepository = (ds: DataSource) => {
    repository = ds.getRepository(BookBorrow)
}

export const getBookBorrowsRepository = () => repository;
