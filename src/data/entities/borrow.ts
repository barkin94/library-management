import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { UserEntity } from "./user";
import { BookEntity } from "./book";
import { Borrow } from "../../entity-types";

@Entity()
export class BorrowEntity {
  
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.borrows)
  user!: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.borrows)
  book!: BookEntity;

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
