import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DataSource,
} from "typeorm";
import { BorrowEntity } from "./borrow";


@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: "decimal", precision: 2, scale: 1 })
  averageRating!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => BorrowEntity, (borrow) => borrow.book)
  borrows!: BorrowEntity[];
}



