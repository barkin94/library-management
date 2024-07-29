import { UserEntity } from "../data/entities/user";
import { UserRepository } from "../data/repositories/user";
import { UserNotFound } from "./errors/user-not-found";

export const getUser = async (id: number, userRepository: UserRepository): Promise<UserEntity> => {
	const user = await userRepository.findOneBy({ id });

	if (!user) {
		throw new UserNotFound(id);
	}

	return user;
}

export const getUsers = async (
  userRepository: UserRepository
): Promise<UserEntity[]> => {
  return await userRepository.find();
};

export const createUser = async (name: string) => {

}