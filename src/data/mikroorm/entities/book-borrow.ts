import {
  Entity,
  PrimaryKey, 
  ManyToOne,
  OneToOne,
  Ref
} from "@mikro-orm/core";

import { User } from "./user";
import { Book } from "./book";
import { BookReturn } from "./book-return";

@Entity()
export class BookBorrow {
  
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  //@JoinColumn({ name: "user_id" })
  user?:  Ref<User>;;

  @ManyToOne()
  //@JoinColumn({ name: "book_id", })
  book?: Book;

  @OneToOne({
    entity: () => BookReturn,
    mappedBy: 'bookBorrow',
    name: 'book_return_id',
  })
  //@JoinColumn({ name: 'book_return_id' }) 
  bookReturn?: BookReturn;
}
