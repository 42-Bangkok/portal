import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./drizzle/schemas/*/**",
  driver: "pg",
  dbCredentials: {
    connectionString: `${process.env.POSTGRES_URI}`
  },
  verbose: true,
  strict: true
});
