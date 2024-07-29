import { Repository } from "typeorm";
import { UserEntity } from "../entities/user";


export class UserRepository extends Repository<UserEntity> {
	
	getUsers(): UserEntity[] {

	}
}
