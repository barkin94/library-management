import { Repository } from "typeorm";
import { BorrowEntity } from "../entities/borrow";

export class BorrowRepository extends Repository<BorrowEntity> {
  // Custom methods can be added here
}
