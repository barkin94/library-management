import { integer } from "drizzle-orm/pg-core";

export const baseEntity = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
}
