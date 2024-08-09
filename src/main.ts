import { getConfig } from "./config";
import { constructDatasource, getDatasource, initDatasourceConn } from "./data/datasource";
import { constructBookBorrowsRepository, getBookBorrowsRepository } from "./data/repositories/book-borrow";
import { constructUsersRepository, getUsersRepository } from "./data/repositories/user";
import { constructBookRepository, getBooksRepository } from "./data/repositories/book";
import { constructBooksController } from "./api/controllers/books";
import { constructUsersController } from "./api/controllers/users";
import { initExpress } from "./api";
import { getBookReturnsRepository } from "./data/repositories/book-return";

export default (async () => {
    const { db: {connectionString, logging} } = getConfig();
    
    constructDatasource(connectionString, logging);
    await initDatasourceConn();
    const dataSource = getDatasource();
    
    constructBookBorrowsRepository(dataSource);
    constructBookRepository(dataSource);
    constructUsersRepository(dataSource);
    
    const booksRepository = getBooksRepository();
    const usersRepository = getUsersRepository();
    const bookBorrowsRepository =  getBookBorrowsRepository();
    const bookReturnRepository =  getBookReturnsRepository();

    constructBooksController(booksRepository);
    constructUsersController(booksRepository, usersRepository, bookBorrowsRepository, bookReturnRepository);
    
    initExpress();
})()



