import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { User } from "./user";
import { Book } from "./book";
import { BookReturn } from "./book-return";

@Entity()
export class BookBorrow {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.borrows)
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  @JoinColumn({ name: "book_id", })
  book?: Book;

/*   @OneToOne(() => BookReturn, (bookReturn) => bookReturn.bookBorrow)
  @JoinColumn({ name: 'book_return_id' }) */
  bookReturn?: BookReturn;
}
