import { defineConfig } from "drizzle-kit";
import { getConfig } from "src/config";

const { db: { connectionString } } = getConfig()

export default defineConfig({
  dialect: "postgresql",
  schema: "drizzle-kit",
});
