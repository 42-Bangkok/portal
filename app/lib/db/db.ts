import { Db, MongoClient } from "mongodb";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// TODO: to be removed
/**
 * Returns a connected MongoDB client.
 *
 * @returns {Promise<Db>} A promise that resolves to a MongoDB client.
 */
export async function getDb(): Promise<Db> {
  try {
    const uri = process.env["MONGODB_URI"] ?? "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db(process.env["MONGODB_DB"] ?? "mongo");
    return database;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

/**
 * Single client is instantiated and shared across the application.
 * This Postgres client is used by Drizzle ORM.
 */
const queryClient = postgres(`${process.env.POSTGRES_URI}`);
export const db = drizzle(queryClient);

declare global {
  // eslint-disable-next-line
  var drizzle: any | undefined;
}

if (process.env.NODE_ENV !== "production") globalThis.drizzle = db;
