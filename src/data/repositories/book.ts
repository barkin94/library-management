import { Book } from "../entities/book";
import dataSource from '../datasource';

export const bookRepository = dataSource.getRepository(Book)