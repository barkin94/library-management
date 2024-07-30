import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { BookBorrow } from "./book-borrow";


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => BookBorrow, (borrow) => borrow.book)
  borrows?: BookBorrow[];
}
