import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Book } from "./book";

@Entity()
export class BookBorrow {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user?: User;

  @ManyToOne(() => Book, (book) => book.borrows)
  book?: Book;

  @Column({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  borrowedAt!: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  returnedAt?: Date;

  @Column({ type: "int", nullable: true })
  rating?: number;
}
