import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { BookBorrow } from "./book-borrow";

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => BookBorrow, (borrow) => borrow.user)
  borrows?: BookBorrow[];
}

