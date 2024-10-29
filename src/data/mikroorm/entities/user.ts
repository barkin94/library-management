import { Collection, Entity, Property, OneToMany } from "@mikro-orm/core";
import { BookBorrow } from "./book-borrow";
import { BaseEntity } from "./base-entity";

@Entity()
export class User extends BaseEntity {

  @Property()
  name!: string;

  @OneToMany(() => BookBorrow, (borrow) => borrow.user)
  borrows = new Collection<BookBorrow>(this);
}

