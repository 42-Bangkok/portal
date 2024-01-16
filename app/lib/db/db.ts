import { Db, MongoClient } from "mongodb";

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
