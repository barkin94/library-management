import { User } from "../entities/user";
import dataSource from '../datasource';


export const userRepository = dataSource.getRepository(User)

