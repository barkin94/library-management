import { User } from "../entities/user";
import { DataSource, Repository } from "typeorm";

let repository: Repository<User>;

export const constructUsersRepository = (ds: DataSource) => {
    repository = ds.getRepository(User)
}

export const getUsersRepository = () => repository;

