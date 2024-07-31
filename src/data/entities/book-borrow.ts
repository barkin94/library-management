import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "./user";
import { Book } from "./book";

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

  @Column({
    name: 'returned_at',
    type: "timestamp with time zone",
    nullable: true
  })
  returnedAt?: Date;

  @Column({type: "int", nullable: true })
  rating?: number;
}
