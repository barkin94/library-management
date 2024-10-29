import {
  Entity,
  Property,
  OneToMany,
  Collection,
} from "@mikro-orm/core";
import { BookBorrow } from "./book-borrow";
import { BaseEntity } from "./base-entity";

@Entity()
export class Book extends BaseEntity {

  @Property()
  name!: string;

  @OneToMany(() => BookBorrow, (bookBorrow) => bookBorrow.book, {name: 'book_borrow_id'})
  borrows = new Collection<BookBorrow>(this);
}
