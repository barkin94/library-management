import {
  Entity,
  PrimaryKey, 
  Property,
  OneToOne,
} from "@mikro-orm/core";
import { BookBorrow } from "./book-borrow";

@Entity()
export class BookReturn {
  
  @PrimaryKey()
  id!: number;

  @Property({
    name: 'returned_at',
  })
  returnedAt!: Date;

  @Property({ type: "int" })
  rating!: number;


  @OneToOne({
    entity: () => BookBorrow,
    name: 'book_borrow_id',
  })
  bookBorrow?: BookBorrow;
}
