import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Borrow, User } from "../../entity-types";
import { BorrowEntity } from "./borrow";

@Entity()
export class UserEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.user)
  borrows!: BorrowEntity[];
}

