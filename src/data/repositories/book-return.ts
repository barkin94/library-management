import { getDb } from "../drizzle";
import { bookReturnsTable } from "../drizzle/schemas";

const db = getDb();

const create = (params: { rating: number, bookBorrowId: number }) => {
    return db.insert(bookReturnsTable).values({ 
        ...params,
        returnedAt: new Date().toISOString()
    });
}


export default {
    create
}