import { eq } from "drizzle-orm";
import { usersTable } from "../drizzle/schemas/user";
import { getDb } from "../drizzle";

const db = getDb();

const getUserById = async (id: number) => {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
    with: {
      borrows: {
        with: {
          book: true,
          bookReturn: true
        }
      }
    }
  }).execute()
}

const findAll = () => {
  return db.query.usersTable.findMany();
};

const createUser = async (params: { name: string }) => {
  return db.insert(usersTable).values({ name: params.name });
}

export default {
  getUserById,
  findAll,
  createUser
}
