import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  Relation
} from "typeorm";
import { BookBorrow } from "./book-borrow";


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => BookBorrow, (bookBorrow) => bookBorrow.book)
  @JoinColumn({ name: 'book_borrow_id' })
  borrows!: BookBorrow[];
}
