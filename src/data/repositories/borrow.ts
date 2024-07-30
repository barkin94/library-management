import { BookBorrow } from "../entities/book-borrow";
import dataSource from '../datasource';

export const borrowRepository = dataSource.getRepository(BookBorrow);