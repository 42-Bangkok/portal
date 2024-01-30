/**
 * This file is used to migrate the database on cloud deployments
 */
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
const sql = postgres(`${process.env.POSTGRES_URI}`, { max: 1 });
const db = drizzle(sql);
await migrate(db, { migrationsFolder: "migrations" });
await sql.end();
