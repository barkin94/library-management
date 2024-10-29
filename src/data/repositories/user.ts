import { EntityRepository } from "@mikro-orm/core";
import { User } from "../mikroorm/entities/user";
import { getMikroORM } from "../mikroorm/entity-manager";

let repository: EntityRepository<User>;

(async () => {
  const mikroorm = await getMikroORM();
  repository = mikroorm.em.getRepository(User);
})()

const getUserById = async (id: string) => {
  const result = await repository.findOne(id, {
    populate: ['borrows.book', 'borrows.bookReturn']
  })

  if(!result)
    return null;

  return {
    ...result,
    borrows: result.borrows.toArray(),
  }
}

const findAll = () => {
  return repository.findAll()
};

const createUser = async (params: { name: string }) => {
  const user = new User();
  user.name = params.name;

  return repository.insert(user);
}

export default {
  getUserById,
  findAll,
  createUser
}
