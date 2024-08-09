import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { BookBorrow } from "./book-borrow";

@Entity()
export class BookReturn {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'returned_at',
    type: "timestamp with time zone",
  })
  returnedAt!: Date;

  @Column({ type: "int" })
  rating!: number;


  @OneToOne(() => BookBorrow, (bookBorrow) => bookBorrow.bookReturn)
  @JoinColumn({ name: 'book_borrow_id' })
  bookBorrow?: BookBorrow;
}
