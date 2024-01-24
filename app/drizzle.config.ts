import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./migrations",
  schema: "./drizzle/*/**",
  driver: "pg",
  dbCredentials: {
    connectionString: `${process.env.POSTGRES_URI}`
  },
  verbose: true,
  strict: true
});
